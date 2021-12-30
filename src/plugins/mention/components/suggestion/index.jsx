/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import withConsumer from '../../../../context/withConsumer';
import getSuggestionQuery from '../../utils/getSuggestionQuery';
import fetchSuggestions from '../../utils/fetchSuggestions';
import getPosition from '../../utils/getPosition';
import CloseIcon from '../../../../components/icons/close-icon';

import './style.css';

const MentionSuggestion = ({
  context,
  handleAddMention = () => {}
}) => {
  const {
    store, getMentionPortal, setShowMention
  } = context;
  const [state, setState] = React.useState({
    suggestions: [],
    showHint: false,
  })
  const activePortal = React.useRef(null);

  const onQueryChange = (searchText, offsetKey) => {
    const filteredSuggestions = fetchSuggestions(searchText);
    activePortal.current = getMentionPortal(offsetKey);
    setState({
      suggestions: filteredSuggestions,
      showHint: false,
    });
    setShowMention(true);
  }

  const onEditorStateChange = React.useCallback(() => {
    if(store.editorState) {
      const query = getSuggestionQuery(
        store.editorState,
        store.mention.searchKeys,
      );
      if(!query) {
        setState({
          suggestions: [],
          showHint: false,
        });
        setShowMention(false);
      } else if (query.suggestionText?.length <= 3 ) {
        setState({
          suggestions: [],
          showHint: true,
        });
        setShowMention(false);
      } else {
        onQueryChange(query.suggestionText, query.offsetKey);
      }
    }
  }, [store.editorState, store.mention]);

  const renderSuggestions = () => {
    const positionStyle = getPosition(activePortal.current);
    return (
      <div className="suggestion-list-container" style={{...positionStyle}}>
        <div className="suggestion-header">
          <span className="hero-tag">
            Super Hero
          </span>
          <span className="close-icon">
            <CloseIcon />
          </span>
        </div>
        <div>
          {
            state.suggestions.map((data, index) => (
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
      </div>
    )
  }

  const renderHint = () => {
    return (
      <div className="suggestion-list-container">
        <div className="suggestion-header">
          <span className="hint-text">
            Type 3 or more characters to search for super heros
          </span>
          <span className="close-icon">
            <CloseIcon />
          </span>
        </div>
      </div>
    )
  }

  const getPopover = () => {
    const {showHint, suggestions} = state;
    const showSuggestion = store.mention.show && suggestions.length;

    if (showHint && !showSuggestion) {
      return renderHint();
    } else if (!showHint && showSuggestion && activePortal.current) {
      return renderSuggestions();
    }
    return null;
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