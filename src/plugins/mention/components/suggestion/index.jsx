/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import withConsumer from '../../../../context/withConsumer';
import getSuggestionQuery from '../../utils/getSuggestionQuery';
import fetchSuggestions from '../../utils/fetchSuggestions';
import getPosition from '../../utils/getPosition';
import CloseIcon from '../../../../components/icons/close-icon';
import SuperHeroCard from '../../../../components/card';

import './style.module.css';

const MentionSuggestion = ({
  context,
  handleAddMention = () => {}
}) => {
  const {
    store, getMentionPortal, setShowMention,
    unregisterMentionPortal,
  } = context || {};
  const [state, setState] = React.useState({
    suggestions: [],
    showHint: false,
    activeOffset: null,
  });
  const activePortal = React.useRef(null);

  const onQueryChange = async (searchText, offsetKey) => {
    setShowMention(true, offsetKey);
    activePortal.current = getMentionPortal(offsetKey);
    const position = getPosition(activePortal.current);
    console.log({...position})
    if(position.top > 72) {
      if(position.top <= 0) {
        document.querySelector('#editor')
        .style.transform = `translateY(-${position.top}px)`;
      } else {
        document.querySelector('#editor')
        .style.transform = `translateY(-${position.top - 72}px)`;
      }
    }

    if (searchText.length >= 4 ) {
      const filteredSuggestions = await fetchSuggestions(searchText);
      setState({
        suggestions: filteredSuggestions,
        showHint: false,
        activeOffset: offsetKey,
      });
    } else {
      setState({
        suggestions: [],
        showHint: true,
        activeOffset: offsetKey,
      });
    }
  }

  const onClose = () => {
    document.querySelector('#editor').parentNode
    .style.transform = `translate(0px)`;
    setState({
      suggestions: [],
      showHint: false,
      activeOffset: null,
    });
    activePortal.current = null;
    unregisterMentionPortal(state.activeOffset)
  };

  const onEditorStateChange = React.useCallback(() => {
    if((store||{}).editorState) {
      const query = getSuggestionQuery(
        store.editorState,
        store.mention.searchKeys,
      );
      if(!query) {
        setState({
          suggestions: [],
          showHint: false,
          activeOffset: null,
        });
        setShowMention(false);
        document.querySelector('#editor')
        .style.transform = `translate(0px)`;
      } else {
        onQueryChange(query.suggestionText, query.offsetKey);
      }
    }
  }, [(store||{}).editorState, (store||{}).mention]);

  const renderSuggestions = () => {
    const positionStyle = getPosition(activePortal.current);
    return (
      <div
        className="suggestion-list-container"
        style={{
          top: (positionStyle.bottom + 8) + 'px'
        }}
      >
        <div className="suggestion-header">
          <span className="hero-tag">
            Super Hero
          </span>
          <span className="close-icon" onClick={onClose}>
            <CloseIcon />
          </span>
        </div>
        <div
          className="item-container">
          {
            state.suggestions.map((data) => (
              <div
                className="item"
                key={data.id}
                onClick={() => handleAddMention(data)}
              >
                <SuperHeroCard {...data} />
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  const renderHint = () => {
    const positionStyle = getPosition(activePortal.current);
    return (
      <div className="suggestion-list-container-hint" style={{top: positionStyle.bottom + 'px'}}>
        <div className="suggestion-header">
          <span className="hint-text">
            Type 3 or more characters to search for super heros
          </span>
          <span className="close-icon" onClick={onClose}>
            <CloseIcon />
          </span>
        </div>
      </div>
    );
  }

  const getPopover = () => {
    const {showHint, suggestions} = state;
    const showSuggestion = ((store||{}).mention||{}).show && suggestions.length;

    if (showHint && !showSuggestion && activePortal.current) {
      return renderHint();
    } else if (!showHint && showSuggestion && activePortal.current) {
      return renderSuggestions();
    }
    return null;
  };

  const handleScrollAndClick = (e) => {
    document.querySelector('#editor')
    .style.transform = `translate(0px)`;
    setState({
      suggestions: [],
      showHint: false,
      activeOffset: null,
    });
  }

  React.useEffect(() => {
    onEditorStateChange(store.editorState);
  }, [(store||{}).editorState]);


  React.useEffect(() => {
    const editor = document.querySelector('#editor').parentNode;
    editor.addEventListener('scroll', handleScrollAndClick);
    editor.addEventListener('click', handleScrollAndClick)
    return () => {
      const editor = document.querySelector('#editor').parentNode;
      editor.removeEventListener('scroll', handleScrollAndClick);
      editor.removeEventListener('click', handleScrollAndClick);
    }
  }, []);

  return (
    <>
      {getPopover()}
    </>
  )
}


export default withConsumer(MentionSuggestion);