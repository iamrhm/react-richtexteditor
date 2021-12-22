/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ReactDOM from 'react-dom';

import withConsumer from '../../../../context/withConsumer';
import getSuggestionQuery from '../../utils/getSuggestionQuery';
import fetchSuggestions from '../../utils/fetchSuggestions';

import './style.css';

const MentionSuggestion = ({
  context,
  handleAddMention = () => {}
}) => {
  const {
    store, getMentionPortal, setShowMention
  } = context;
  const [suggestions, setSuggestions] = React.useState([]);
  const activePortal = React.useRef(null);

  const onQueryChange = (searchText, offsetKey) => {
    const filteredSuggestions = fetchSuggestions(searchText);
    setSuggestions(filteredSuggestions);
    activePortal.current = getMentionPortal(offsetKey);
    setShowMention(true);
  }

  const onEditorStateChange = React.useCallback(() => {
    if(store.editorState) {
      const query = getSuggestionQuery(
        store.editorState,
        store.mention.searchKeys,
      );
      if(!(query && query.suggestionText.length >= 4)) {
        return setShowMention(false);
      }
      onQueryChange(query.suggestionText, query.offsetKey);
    }
  }, [store.editorState, store.mention]);

  const getPopover = () => {
    const showSuggestion = store.mention.show && suggestions.length && activePortal.current;
    return (
      <>
        {
          showSuggestion ? (
            ReactDOM.createPortal(
              (
                <div className="suggestion-list-container">
                  {
                    suggestions.map((data, index) => (
                      <div
                        className="item"
                        key={index}
                        onClick={() => handleAddMention(data)}
                      >
                        <div className="item-title">
                          { data.title }
                        </div>
                        <div className="item-subtitle">
                          { data.subtitle }
                        </div>
                      </div>
                    ))
                  }
                </div>
              ),
              activePortal.current
            )
          ) : null
        }
      </>
    )
  };

  React.useEffect(() => {
    onEditorStateChange(store.editorState);
  }, [store.editorState]);


  return (
    <>
      {getPopover()}
    </>
  )
}


export default withConsumer(MentionSuggestion);