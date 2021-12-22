import React from 'react';

export const EditorContext = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: undefined,
      mention: {
        show: false,
        selectedData: undefined,
        searchKeys: new Set(),
      }
    };
    this.mentionPortal = new Map();
  }

  getEditorState = () => {
    return this.state.editorState;
  }

  setEditorState = (editorState) => {
    this.setState((prevState) => ({
      ...prevState,
      editorState: editorState
    }));
  }

  setShowMention = (
    isOpen,
    selectedData = undefined,
    offsetKey = null,
  ) => {
    this.setState((prevState) => {
      const newSearchKeys = offsetKey ?
      prevState.mention.searchKeys.add(offsetKey) :
      prevState.mention.searchKeys;
      return {
        ...prevState,
        mention: {
          show: isOpen,
          searchKeys: newSearchKeys,
          selectedData
        }
      }
    });
  }

  registerMentionPortal = (element, offsetKey) => {
    this.mentionPortal.set(element, offsetKey);
  };

  unregisterMentionPortal = (offsetKey) => {
    this.mentionPortal.delete(offsetKey);
  };

  getMentionPortal = (offsetKey) => {
    return this.mentionPortal.get(offsetKey);
  }

  render() {
    return (
      <EditorContext.Provider
        value={{
          store: this.state,
          mentionPortal: this.mentionPortal,
          getEditorState: this.getEditorState,
          setEditorState: this.setEditorState,
          setShowMention: this.setShowMention,
          registerMentionPortal: this.registerMentionPortal,
          unregisterMentionPortal: this.unregisterMentionPortal,
          getMentionPortal: this.getMentionPortal
        }}
      >
        {this.props.children}
      </EditorContext.Provider>
    );
  }
}

export default Provider;