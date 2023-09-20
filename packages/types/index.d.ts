import { EditorState } from "draft-js";

export type ILinkType = 'url';

export interface IEntityInfo extends object {
  viewText: string;
  url?: string
}

export interface IEntity {
  id: string;
  type: ILinkType | string;
  info: IEntityInfo;
}

export type IEntityMap = {
  [key: string]: IEntity;
}

/* parsed data types */
export interface IParsedRichData {
  body: string[];
  richContent: IEntityMap;
}

/* parsed data to render UI */
export interface IRichShaveFormat {
  body: string[];
  richContent: IEntityMap;
  linkMetaInfo: object;
}

export interface IRenderHint {
  (
    { bottom, top, left }: { bottom: number; top: number; left: number; },
    currentTriggerKey: string,
    onClose: () => void,
    hideSuggestions: () => void,
  ): JSX.Element;
}

export interface IRenderSuggestions {
  (
    { bottom, top, left }: { bottom: number; top: number; left: number; },
    suggestions: Array<IEntityInfo>,
    currentTriggerKey: string,
    onClose: () => void,
    handleAddEntity: (entityInfoData: IEntityInfo) => void,
    hideSuggestions: () => void,
  ): JSX.Element
}

export interface IFetchSuggestions {
  (searchText: string, triggerKey: string): Promise<({
    suggestions: Array<IEntityInfo>,
    showHint: boolean,
  })>
}

export interface IHandleLinks {
  (
    type: 'add' | 'delete',
    data: { meta: IEntityInfo, offsetKey: string }
  ): void
}

export interface IHandleEntitiesCb {
  (entityData: IEntityInfo, triggerKey: string): void
}

/* editor component & context, props/state types */
export interface IEditorProps {
  isTriggerInserted: boolean;
  possibleTriggerKeys: Array<string>;
  placeholder: string;
  editorContainerRef: React.MutableRefObject<HTMLDivElement>;

  children?: React.ReactNode;
  fontStyleClass?: string;
  initialState?: EditorState;
  externalTriggerKey?: string;

  setEditorState: (editorState: EditorState) => void;
  fetchSuggestions: IFetchSuggestions;
  renderSuggestions: IRenderSuggestions;
  renderHint: IRenderHint;
  handleLinks: IHandleLinks;
  handleEntitiesCb: IHandleEntitiesCb;
  resetIsTriggerInserted: () => void;
  onFocusCb: () => void;
}

export interface IEditorProviderState {
  editorState: EditorState;
  possibleTriggerKeys:  Array<string>;
  tagState: {
    show: boolean,
    searchKeys: Set<string>,
  };
}

export interface IEditorContext {
  store: IEditorProviderState;

  getEditorState: () => void;
  setEditorState: (editorState: EditorState) => void;
  setShowSuggestions: (
    isOpen: boolean,
    offsetKey: string
  ) => void,
  registerSuggestionPortal: (element: JSX.Element, offsetKey: string) => void;
  unregisterSuggestionPortal: (offsetKey: string) => void;
  getTagPortal: (offsetKey: string) => void;
  addNewLink: ({ meta, offsetKey } : { meta: IEntityInfo, offsetKey: string }) => void;
  deleteLink: (offsetKey: string) => void;
}

export interface IEditorState extends EditorState {};
