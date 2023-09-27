/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';
import React from 'react';
import RichEditor, {
  parseEditorData,
  IEntityInfo, IRenderSuggestions, IRenderHint,
  IEditorState, IEntityMap, IEntity, IParsedRichData
} from "@mittirorg/react-richtext";
import "@mittirorg/react-richtext/dist/style.css";

/*
import {
  IEntityInfo, IRenderSuggestions, IRenderHint,
  IEditorState, IEntityMap, IEntity, IParsedRichData
} from "@packages/types"; */

import Modal from '../modal';
import CloseIcon from '../icons/close-icon';
import RichPopUps from '../RichComponents/RichPopups';
import TagSuggestions from '../RichComponents/TagSuggestions';
import { triggerMap } from '../../libs/constants';
import { getFilteredSuperHeros, getURLMetaInfo, saveData } from '../../services';

const initialState: {
  isTriggerInserted: boolean,
  externalTriggerKey: string,
  editorState: IEditorState,
  entityData: IEntityMap,
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


function InputBox({
  addNewPost
}: {
  addNewPost: (postData: IParsedRichData) => void
}) {
  const [showEditor, toggleEditor] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [urlMeta, setUrlMeta] = React.useState(null);

  const previewList = React.useRef<Map<string, IEntity>>(new Map());
  const editorContainerRef = React.useRef<HTMLDivElement>(null);

  const { editorState, entityData } = state as typeof initialState;

  const setEditorState = (newEditorState: IEditorState): void => {
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
    const parsedData = parseEditorData(
      editorState,
      entityData,
      previewList.current,
    );
    parsedData.id = `${Date.now()}`;
    addNewPost(parsedData);
    saveData(parsedData);
    toggleEditor(false);
    return null;
  };

  const updatePreviewMeta = async (tempID: string): Promise<void> => {
    const urlEntity = previewList.current?.get(tempID);
    const urlMeta = await getURLMetaInfo(urlEntity.info.url);
    if (urlMeta) {
      urlEntity.info = { ...urlEntity.info, ...urlMeta };
      previewList.current?.set(tempID, urlEntity);
      setUrlMeta(urlMeta);
    }
  };

  const handleRichLink = (
    type: 'add' | 'delete' | 'hideMeta',
    data?: { meta: any, offsetKey: string },
  ): void => {
    const { meta = {}, offsetKey } = data || {};
    const triggerData = previewList.current?.get(offsetKey) || {} as IEntity;
    const tempID = `${Number(`${Date.now()}${previewList.current?.size}${Math.round(Math.random() * 10)}`)}`;

    if ((!offsetKey || offsetKey === '') && type !== 'hideMeta') {
      return;
    }
    switch (type) {
      case 'add':
        previewList.current?.set(offsetKey, {
          info: { ...triggerData?.info, ...meta },
          id: triggerData?.id || tempID,
          type: 'url',
        });
        updatePreviewMeta(offsetKey);
        return;
      case 'delete':
        previewList.current?.delete(offsetKey);
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
        type: triggerMap[triggerKey === '@' ? '@' : '@'].entityType,
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
    editorContainerRef.current?.focus();
  }

  React.useEffect(() => {
    if (!showEditor) {
      dispatch({ type: 'RESET_EDITOR', payload: initialState });
      setUrlMeta(null);
    }
  }, [showEditor]);

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
            <div className="w-full min-h-[221px] max-h-[452px] py-4 px-6 text-gray-600 overflow-auto" ref={editorContainerRef}>
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
              {
                urlMeta?.image && (
                  <a className="flex flex-col rounded-lg shadow mb-4 mt-4" href={urlMeta?.url} target="_blank">
                    <div className="w-full border-solid rounded-lg bg-slate-300">
                      <img
                        src={urlMeta?.image}
                        className="object-cover w-full rounded-lg"
                      />
                    </div>
                    <div className="rounded pt-3 w-full flex flex-col justify-between px-3 pb-4">
                      <div className="mb-2 text-base font-medium text-gray-700">
                        {urlMeta?.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {urlMeta?.description}
                      </div>
                    </div>
                  </a>
                )
              }
            </div>
            {/* Footer */}
            <div className="z-10 rounded-none lg:rounded-b bg-slate-100 flex items-center justify-between py-4 px-3 lg:px-4 border border-solid border-gray-200">
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