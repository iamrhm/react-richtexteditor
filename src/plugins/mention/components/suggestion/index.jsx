/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import withConsumer from '../../../../context/withConsumer';
import getSuggestionQuery from '../../utils/getSuggestionQuery';
import getPosition from '../../utils/getPosition';

import './style.module.css';

const MentionSugWithHOC = withConsumer(function MentionSuggestion({
  context={},
  editorContainerRef = {},
  handleAddMention = () => {},
  fetchSuggestions = () => ({
    suggestion: [],
    showHint: false,
  }),
  renderSuggestions = () => null,
  renderHint = () => null
}){
  const {
    store = {},
    getMentionPortal = () => null,
    setShowMention = () => {},
    unregisterMentionPortal = () => {},
  } = context;
  const [state, setState] = React.useState({
    suggestions: [],
    showHint: false,
    activeOffset: null,
  });
  const activePortal = React.useRef(null);

  const onQueryChange = async (searchText, offsetKey) => {
    setShowMention(true, offsetKey);
    activePortal.current = getMentionPortal(offsetKey);
    if(activePortal.current){
      activePortal.current.scrollIntoView();
    }
    const {
      suggestions,
      showHint
    } = await fetchSuggestions(searchText);
    setState({
      suggestions: suggestions,
      showHint: showHint,
      activeOffset: offsetKey,
    });
  }

  const onSuggestionDismiss = () => {
    setState({
      suggestions: [],
      showHint: false,
      activeOffset: null,
    });
    activePortal.current = null;
    unregisterMentionPortal(state.activeOffset)
  };

  const closeSuggestions = () => {
    setState({
      suggestions: [],
      showHint: false,
    });
    setShowMention(false, state.activeOffset);
  }

  const onEditorStateChange = React.useCallback(() => {
    if(store.editorState) {
      const query = getSuggestionQuery(
        store.editorState,
        store.mention.searchKeys,
        store.trigger
      );
      if(!query) {
        setState({
          suggestions: [],
          showHint: false,
          activeOffset: null,
        });
        setShowMention(false);
      } else {
        onQueryChange(query.suggestionText, query.offsetKey);
      }
    }
  }, [store.editorState, store.mention]);

  const getPopover = () => {
    const {showHint, suggestions} = state;
    const showSuggestion = (store.mention||{}).show && suggestions.length;
    if(activePortal.current) {
      const positionStyle = getPosition(activePortal.current);
      if (showHint && !showSuggestion && activePortal.current) {
        return renderHint(
          {...positionStyle},
          onSuggestionDismiss
        );
      } else if (!showHint && showSuggestion && activePortal.current) {
        return renderSuggestions(
          {...positionStyle},
          suggestions,
          onSuggestionDismiss,
          handleAddMention
        );
      }
    }
    return null;
  };

  React.useEffect(() => {
    onEditorStateChange(store.editorState);
  }, [store.editorState]);

  React.useEffect(() => {
    if(editorContainerRef.current) {
      editorContainerRef.current
      .addEventListener('scroll', closeSuggestions);
    }
    return () => {
      if(editorContainerRef.current) {
        editorContainerRef.current
        .removeEventListener('scroll', closeSuggestions);
      }
    }
  }, [editorContainerRef.current]);

  return (
    <>
      {getPopover()}
    </>
  )
});


export default React.forwardRef((props, ref) => (
  <MentionSugWithHOC editorContainerRef={ref} {...props} />
));
