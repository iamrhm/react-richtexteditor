declare type ILinkType = 'url';

declare interface IEntityInfo extends object {
  viewText: string;
  url?: string
}

declare interface IEntity {
  id: string;
  type: ILinkType | string;
  info: IEntityInfo;
}

declare type IEntityMap = {
  [key: string]: IEntity;
}

/* parsed data types */
declare interface IParsedRichData {
  body: string[];
  richContent: IEntityMap;
}

/* parsed data to render UI */
declare interface IRichShaveFormat {
  body: string[];
  richContent: IEntityMap;
  linkMetaInfo: object;
}

declare interface IRenderHint {
  (
    { bottom, top, left }: { bottom: number; top: number; left: number; },
    currentTriggerKey: string,
    onClose: () => void,
    hideSuggestions: () => void,
  ): JSX.Element;
}

declare interface IRenderSuggestions {
  (
    { bottom, top, left }: { bottom: number; top: number; left: number; },
    suggestions: Array<IEntityInfo>,
    currentTriggerKey: string,
    onClose: () => void,
    handleAddEntity: (entityInfoData: IEntityInfo) => void,
    hideSuggestions: () => void,
  ): JSX.Element
}

declare interface IFetchSuggestions {
  (searchText: string, triggerKey: string): Promise<({
    suggestions: Array<IEntityInfo>,
    showHint: boolean,
  })>
}

declare interface IHandleLinks {
  (
    type: 'add' | 'delete',
    data: { meta: IEntityInfo, offsetKey: string }
  ): void
}

declare interface IHandleEntitiesCb {
  (entityData: IEntityInfo, triggerKey: string): void
}

/* editor component & context, props/state types */
declare interface IEditorProps {
  isTriggerInserted: boolean;
  possibleTriggerKeys: Array<string>;
  editorContainerRef: React.MutableRefObject<HTMLDivElement>;
  placeholder: string;
  children: React.ReactNode;

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

declare interface IEditorProviderState {
  editorState: EditorState;
  possibleTriggerKeys:  Array<string>;
  tagState: {
    show: boolean,
    searchKeys: Set<string>,
  };
}

declare interface IEditorContext {
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
