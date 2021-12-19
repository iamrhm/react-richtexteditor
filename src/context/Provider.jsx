import React from 'react';

export const EditorContext = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: undefined,
      mention: {
        show: false,
        elm: null,
        selectedData: undefined,
      }
    }
  }

  getEditorState = () => {
    return this.state.editorState;
  }

  setEditorState = (editorState) => {
    this.setState({
      editorState: editorState
    })
  }

  setShowMention = (
    isOpen,
    mentionElm = null,
    selectedData = undefined
  ) => {
    this.setState({
      mention: {
        show: isOpen,
        elm: mentionElm,
        selectedData
      }
    });
  }

  render() {
    return (
    <EditorContext.Provider
      value={{
        store: this.state,
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