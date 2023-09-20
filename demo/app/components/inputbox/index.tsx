'use client';
import React from 'react';
import RichEditor from "@packages/react-richtext";

import { IEntityInfo, IRenderSuggestions, IRenderHint, IEditorState } from "@packages/types";

import Modal from '../modal';
import CloseIcon from '../icons/close-icon';
import RichPopUps from '../RichComponents/RichPopups';
import TagSuggestions from '../RichComponents/TagSuggestions';
import { triggerMap } from '../../libs/constants';
import { getFilteredSuperHeros } from '../../services';

interface IEntityData {
  id: string;
  info: IEntityInfo;
  entityType: string;
}

const initialState: {
  isTriggerInserted: boolean,
  externalTriggerKey: string,
  editorState: IEditorState,
  entityData: IEntityData,
} = {
  isTriggerInserted: false,
  externalTriggerKey: null,
  editorState: null,
  entityData: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'INSERT_TRIGGER':
      return { ...state, ...action.payload };
    case 'RESET_TRIGGER':
      return { ...state, ...action.payload };
    case 'HIDE_LINK_META':
      return { ...state, ...action.payload };
    case 'ADD_NEW_TAG':
      return { ...state, ...action.payload };
    case 'UPDATE_VALIDATION':
      return { ...state, ...action.payload };
    case 'UPDATE_EDITOR_STATE':
      return { ...state, ...action.payload };
    case 'SET_MAX_HEIGHT':
      return { ...state, ...action.payload };
    case 'RESET_EDITOR':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};


function InputBox() {
  const [showEditor, toggleEditor] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const previewList = React.useRef<Map<string, any>>(new Map());
  const editorContainerRef = React.useRef<HTMLDivElement>(null);

  const { editorState, entityData } = state as typeof initialState;

  const setEditorState = (newEditorState: any): void => {
    dispatch({
      type: 'UPDATE_EDITOR_STATE',
      payload: { editorState: newEditorState }
    });
  };

  const insertTagTrigger = (triggerKey: '@'): void => {
    dispatch({
      type: 'INSERT_TRIGGER',
      payload: {
        isTriggerInserted: true,
        externalTriggerKey: triggerKey,
      },
    });
  };

  const resetIsTriggerInserted = (): void => {
    dispatch({
      type: 'RESET_TRIGGER',
      payload: {
        isTriggerInserted: false,
      },
    });
  };

  const handleSubmit = (): void => {
    console.log('handleSubmit', editorState.getCurrentContent());
    return null;
  };

  const updatePreviewMeta = async (tempID: string): Promise<void> => {
  };

  const handleRichLink = (
    type: 'add' | 'delete' | 'hideMeta',
    data?: { meta: any, offsetKey: string },
  ): void => {
    const { meta = {}, offsetKey } = data || {};
    const triggerData = previewList.current?.get(offsetKey) || {};
    const tempID = `${Number(`${Date.now()}${previewList.current?.size}${Math.round(Math.random() * 10)}`)}`;

    if ((!offsetKey || offsetKey === '') && type !== 'hideMeta') {
      return;
    }
    switch (type) {
      case 'add':
        previewList.current?.set(offsetKey, {
          info: { ...triggerData.info, ...meta },
          id: triggerData.id || tempID,
          type: 'url',
        });
        updatePreviewMeta(triggerData.id || tempID);
        return;
      case 'delete':
        previewList.current?.delete(offsetKey);
        updatePreviewMeta(triggerData.id || tempID);
        break;
      default: break;
    }
  };

  const addEntitiesCb = (
    data: IEntityInfo,
    triggerKey: string,
  ): void => {
    const oldAssetData = entityData || {};
    const newAssetData = {
      ...oldAssetData,
      [data.viewText]: {
        info: { ...data },
        id: `${Date.now()}`,
        entityType: triggerMap[triggerKey === '@' ? '@' : '@'].entityType,
      },
    };
    dispatch({ type: 'ADD_NEW_TAG', payload: { entityData: newAssetData } });
  };

  const fetchSuggestions = async (
    searchText: string,
    triggerKey: string,
  ): Promise<{
      suggestions: Array<IEntityInfo>,
      showHint: boolean
    }> => {
    searchText = searchText.replace(triggerKey, '')
      .toLowerCase();
    if (searchText.trim().length >= 3) {
      const items = await getFilteredSuperHeros(
        searchText,
      );
      return { suggestions: items, showHint: false };
    }
    return { suggestions: [], showHint: true };
  };

  const renderSuggestions: IRenderSuggestions = (
    { bottom, top, left },
    suggestions,
    currentTriggerKey,
    onClose,
    handleAddEntity,
    hideSuggestions,
  ): JSX.Element => {
    const leftPos = editorContainerRef?.current ?
      editorContainerRef.current.getBoundingClientRect().left :
      left - 16;

    const combinedProps = {
      className: 'entity-suggestion-wrapper',
      hideSuggestions: hideSuggestions,
      ref: editorContainerRef
    };

    return (
      <>
        <style jsx>
          {`
            :global(.entity-suggestion-wrapper) {
              top: ${bottom + 8}px;
              left: ${leftPos + 8}px;
            }
          `}
        </style>
        <RichPopUps
          {...combinedProps}
        >
          <TagSuggestions
            suggestions={suggestions}
            trigger={currentTriggerKey}
            onClose={onClose}
            handleAddTag={handleAddEntity}
          />
        </RichPopUps>
      </>
    );
  };

  const renderHint: IRenderHint = (
    { bottom, top, left },
    currentTriggerKey,
    onClose,
    hideSuggestions,
  ): JSX.Element => {
    const leftPos = editorContainerRef?.current ?
      editorContainerRef.current.getBoundingClientRect().left :
      left - 16;

    const combinedProps = {
      className: 'hint-text',
      hideSuggestions: hideSuggestions,
      ref: editorContainerRef,
    };

    return (
      <>
        <style jsx>
          {`
            :global(.hint-text) {
              top: ${bottom + 8}px;
              left: ${leftPos + 4}px;
            }
          `}
        </style>
        <RichPopUps
          {...combinedProps}
        >
          <div className="flex items-center justify-between text-sm py-2 px-3">
            <span>
              {triggerMap[currentTriggerKey === '@' ? '@' : '@'].suggestionPlaceholder}
            </span>
            <span
              className="py-2 px-2 ml-3 hover:bg-slate-100 text-white flex items-center justify-center rounded cursor-pointer text-xs"
              onClick={onClose}
            >
              <CloseIcon />
            </span>
          </div>
        </RichPopUps>
      </>
    );
  };

  function handleOnFocus(): void {
    /* throw new Error('Function not implemented.'); */
  }

  return (
    <>
      <div className=" text-gray-400 text-sm font-semibold w-full cursor-pointer" onClick={() => toggleEditor(true)}>
        What do you have in mind?
      </div>
      {showEditor && (
        <Modal>
          <div className="rounded-none lg:rounded w-[544px] min-h-full lg:min-h-[346px] lg:max-h-[577px] relative text-gray-600 text-sm bg-white border border-solid border-gray-200">
            {/* input header */}
            <div className="py-4 px-3 lg:px-4 w-full border-b border-solid border-gray-200 flex items-center justify-between">
              <div className='flex'>
                <div className="w-6 h-6 mr-3 rounded-full animate-pulse bg-slate-300"></div>
                <div className="w-[124px] h-6 rounded animate-pulse bg-slate-300"></div>
              </div>
              <div
                className="py-2 px-3 hover:bg-slate-100 text-white h-9 flex items-center justify-center rounded cursor-pointer"
                onClick={() => toggleEditor(false)}
              >
                <CloseIcon />
              </div>
            </div>
            {/* rich input content */}
            <div className="w-full min-h-[221px] max-h-[452px] py-4 px-6 text-gray-600" ref={editorContainerRef}>
              <RichEditor
                isTriggerInserted={state.isTriggerInserted}
                externalTriggerKey={state.externalTriggerKey}
                initialState={state.editorState}
                possibleTriggerKeys={['@']}
                ref={editorContainerRef}
                placeholder="What do you feel like talking about today?"
                setEditorState={setEditorState}
                fetchSuggestions={fetchSuggestions}
                renderSuggestions={renderSuggestions}
                renderHint={renderHint}
                resetIsTriggerInserted={resetIsTriggerInserted}
                handleLinks={handleRichLink}
                onFocusCb={handleOnFocus}
                handleEntitiesCb={addEntitiesCb}
              />
            </div>
            {/* Footer */}
            <div className="z-10 rounded-none lg:rounded-b bg-slate-100 flex items-center justify-between py-4 px-3 lg:px-4 border-t border-solid border-gray-200">
              <div className="flex justify-between w-full">
                <div className='flex'>
                  <div
                    className="py-2 px-4 mr-3 bg-white h-9 flex items-center justify-center rounded cursor-pointer border border-solid border-gray-300"
                    onClick={() => insertTagTrigger('@')}
                  >
                    @
                  </div>
                  {/* <div className="py-2 px-4 bg-white h-9 flex items-center justify-center rounded cursor-pointer border border-solid border-gray-300">
                    Add Image
                  </div> */}
                </div>
                <div
                  className="py-2 px-4 bg-black text-white h-9 items-center justify-center rounded cursor-pointer"
                  onClick={handleSubmit}
                >
                  Post
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default InputBox;