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
    this.mentionPortal = null;
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
    mentionPortal = null,
    selectedData = undefined,
    offsetKey = null,
  ) => {
    this.mentionPortal = mentionPortal;
    this.setState((prevState) => {
      if(offsetKey) {
        return {
          ...prevState,
          mention: {
            show: isOpen,
            searchKeys: prevState.mention.searchKeys.add(offsetKey),
            selectedData
          }
        }
      } else {
        return {
          ...prevState,
          mention: {
            show: isOpen,
            searchKeys: prevState.mention.searchKeys,
            selectedData
          }
        }
      }
    });
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
        }}
      >
        {this.props.children}
      </EditorContext.Provider>
    );
  }
}

export default Provider;