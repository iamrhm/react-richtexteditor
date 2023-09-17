import React from 'react';
import { EditorState } from 'draft-js';

export const EditorContext = React.createContext<IEditorContext | null>(null);

class Provider extends React.Component<IEditorProps, IEditorProviderState> {
  constructor(props: IEditorProps) {
    super(props);
    this.state = {
      editorState: null,
      possibleTriggerKeys: props.possibleTriggerKeys || ['@'],
      tagState: {
        show: false,
        searchKeys: new Set(),
      },
    };
    this.tagPortal = new Map();
  }

  getEditorState = (): EditorState => this.state.editorState;

  setEditorState = (editorState: EditorState): void => {
    this.setState(prevState => ({
      ...prevState,
      editorState,
    }), () => {
      this.props.setEditorState(this.state.editorState);
    });
  }

  addNewLink = ({ meta, offsetKey } : {
    meta: IEntityInfo,
    offsetKey: string
  }): void => {
    this.props.handleLinks('add', { meta, offsetKey });
  };

  deleteLink = (offsetKey: string): void => {
    this.props.handleLinks('delete', { meta: null, offsetKey });
  }

  setShowSuggestions = (
    isOpen: boolean = false,
    offsetKey: string = null,
  ): void => {
    this.setState((prevState) => {
      const newSearchKeys = offsetKey ?
        prevState.tagState.searchKeys.add(offsetKey) :
        prevState.tagState.searchKeys;
      return {
        ...prevState,
        tagState: {
          show: isOpen,
          searchKeys: newSearchKeys,
        },
      };
    });
  }

  getTagPortal = (offsetKey: string): React.ReactNode => this.tagPortal.get(offsetKey)

  registerSuggestionPortal = (element: React.ReactNode, offsetKey: string): void => {
    this.tagPortal.set(`${offsetKey}`, element);
  };

  unregisterSuggestionPortal = (offsetKey: string): void => {
    this.tagPortal.delete(offsetKey);
  };

  tagPortal: Map<string, React.ReactNode>;

  render(): JSX.Element {
    return (
      <EditorContext.Provider
        value={{
          store: this.state,
          getEditorState: this.getEditorState,
          setEditorState: this.setEditorState,
          setShowSuggestions: this.setShowSuggestions,
          registerSuggestionPortal: this.registerSuggestionPortal,
          unregisterSuggestionPortal: this.unregisterSuggestionPortal,
          getTagPortal: this.getTagPortal,
          addNewLink: this.addNewLink,
          deleteLink: this.deleteLink,
        }}
      >
        {this.props.children}
      </EditorContext.Provider>
    );
  }
}

export default Provider;
