import React from 'react';

import withConsumer from '../../../../context/withConsumer';
import getSuggestionQuery from '../../utils/getSuggestionQuery';
import getSuggestions from '../../utils/getSuggestions';

import './style.css';

const MentionSuggestion = ({
  context,
  handleAddMention = () => {}
}) => {
  const {
    store, mentionPortal, setShowMention
  } = context;
  const [suggestions, setSuggestions] = React.useState([]);
  const popoverRef = React.useRef(null);

  const onQueryChange = (searchText) => {
    const filteredSuggestions = getSuggestions(searchText);
    setSuggestions(filteredSuggestions);
    setShowMention(
      true,
      mentionPortal
    );
  }

  const onEditorStateChange = React.useCallback(() => {
    if(store.editorState) {
      const suggestionText = getSuggestionQuery(
        store.editorState,
        store.mention.searchKeys,
      );
      if(!(suggestionText && suggestionText.length >= 4)) {
        return setShowMention(
          false,
          mentionPortal
        );
      }
      onQueryChange(suggestionText);
    }
  }, [store.editorState, store.mention]);

  React.useEffect(() => {
    onEditorStateChange(store.editorState);
  }, [store.editorState]);

  if (store.mention.show && mentionPortal !== null && suggestions.length) {
    return (
      <div ref={popoverRef}>
        {
          suggestions.map((data, index) => (
            <div className="item" key={index} onClick={(e) => {
                  handleAddMention(data)
                }}>
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
    );
  }
  return null;
}


export default withConsumer(MentionSuggestion);