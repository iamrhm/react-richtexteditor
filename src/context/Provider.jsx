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
      },
    };
    this.previewLink = new Map();
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

  setPreviewLink = ({url, offsetKey}) => {
    this.previewLink.set(offsetKey, url);
  };

  getPreviewLink= (offsetKey) => {
    return this.previewLink.get(offsetKey);
  }

  deletePreviewLink = (offsetKey) => {
    this.previewLink.delete(offsetKey);
  }

  getLinkPreview = () => {
    return [...this.previewLink]
    .map(([name, value]) => ({ offsetKey: name, url: value }))[0];
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

  getMentionPortal = (offsetKey) => {
    return this.mentionPortal.get(offsetKey);
  }

  registerMentionPortal = (element, offsetKey) => {
    this.mentionPortal.set(element, offsetKey);
  };

  unregisterMentionPortal = (offsetKey) => {
    this.mentionPortal.delete(offsetKey);
  };

  render() {
    return (
      <EditorContext.Provider
        value={{
          store: this.state,
          getEditorState: this.getEditorState,
          setEditorState: this.setEditorState,
          setShowMention: this.setShowMention,
          registerMentionPortal: this.registerMentionPortal,
          unregisterMentionPortal: this.unregisterMentionPortal,
          getMentionPortal: this.getMentionPortal,
          setPreviewLink: this.setPreviewLink,
          getPreviewLink: this.getPreviewLink,
          deletePreviewLink: this.deletePreviewLink,
          getLinkPreview: this.getLinkPreview
        }}
      >
        {this.props.children}
      </EditorContext.Provider>
    );
  }
}

export default Provider;