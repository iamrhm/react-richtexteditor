import React from 'react';
import { IEditorProps, IEditorContext, IEntityInfo } from '@packages/types';

import withConsumer from '../../../context/withConsumer';
import getSuggestionQuery from '../utils/getSuggestionQuery';
import getPosition from '../utils/getPosition';
import useForwardedRef from '../../../libs/hooks/useForwardedRef';

interface IProps extends IEditorProps {
  context?: IEditorContext;
  handleAddEntity: (offsetKey: string, triggerKey: string, entityInfoData: IEntityInfo) => void;
}

const TagSugWithHOC = withConsumer(
  ({
    context,
    editorContainerRef = null,

    handleAddEntity,
    fetchSuggestions,
    renderSuggestions,
    renderHint,
  }: IProps) => {
    const { store, getTagPortal, setShowSuggestions, unregisterSuggestionPortal } = context;

    const [state, setState] = React.useState({
      suggestions: [],
      showHint: false,
      activeOffset: null,
      activeTriggerKey: null,
    });
    const activePortal = React.useRef(null);

    const onQueryChange = async (searchText: string, offsetKey: string, triggerKey: string): Promise<void> => {
      setShowSuggestions(true, offsetKey);
      activePortal.current = getTagPortal(offsetKey);

      if (activePortal.current) {
        activePortal.current.scrollIntoView();
      }
      const { suggestions, showHint } = await fetchSuggestions(searchText, state.activeTriggerKey);

      setState({
        suggestions,
        showHint,
        activeOffset: offsetKey,
        activeTriggerKey: triggerKey,
      });
    };

    const onSuggestionDismiss = (): void => {
      setState({
        suggestions: [],
        showHint: false,
        activeOffset: null,
        activeTriggerKey: null,
      });
      activePortal.current = null;
      unregisterSuggestionPortal(state.activeOffset);
    };

    const hideSuggestions = (): void => {
      setState({
        ...state,
        suggestions: [],
        showHint: false,
      });
      setShowSuggestions(false, state.activeOffset);
    };

    const onEditorStateChange = React.useCallback(() => {
      if (store.editorState) {
        const query = getSuggestionQuery(store.editorState, store.tagState.searchKeys, store.possibleTriggerKeys);
        /* if query is not null */
        if (!query || query?.suggestionText === '') {
          setState({
            ...state,
            suggestions: [],
            showHint: false,
            activeOffset: null,
          });
          setShowSuggestions(false, null);
        } else {
          onQueryChange(query.suggestionText, query.offsetKey, query.triggerKey);
        }
      }
    }, [store.editorState, store.tagState]);

    const onTagSelection = (entityInfoData: IEntityInfo): void => {
      const { activeOffset, activeTriggerKey } = state;
      handleAddEntity(activeOffset, activeTriggerKey, entityInfoData);
    };

    const getPopover = (): JSX.Element => {
      const { showHint, suggestions, activeTriggerKey } = state;
      const showSuggestion = (store.tagState || {}).show && suggestions.length;
      if (activePortal.current) {
        const positionStyle = getPosition(activePortal.current);
        if (showHint && !showSuggestion && activePortal.current) {
          return renderHint({ ...positionStyle }, activeTriggerKey, onSuggestionDismiss, hideSuggestions);
        } else if (!showHint && showSuggestion && activePortal.current) {
          return renderSuggestions(
            { ...positionStyle },
            suggestions,
            activeTriggerKey,
            onSuggestionDismiss,
            onTagSelection,
            hideSuggestions,
          );
        }
      }
      return null;
    };

    React.useEffect(() => {
      onEditorStateChange();
    }, [store.editorState]);

    React.useEffect(() => {
      if (editorContainerRef?.current) {
        editorContainerRef.current.addEventListener('scroll', hideSuggestions);
      }
      return (): void => {
        if (editorContainerRef?.current) {
          editorContainerRef.current.removeEventListener('scroll', hideSuggestions);
        }
      };
    }, [editorContainerRef?.current]);

    return <>{getPopover()}</>;
  },
);

export default React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const innerRef = useForwardedRef(ref);
  return <TagSugWithHOC editorContainerRef={innerRef} {...props} />;
});
