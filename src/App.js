import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  CompositeDecorator,
} from 'draft-js';

import decoratorArray from './plugins/decorator';
import addCustomBlocks from './plugins/modifiers';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    const decorator = new CompositeDecorator(decoratorArray);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
    }
    this.editorRef = React.createRef();
    this.focus = () => { this.editorRef.current.focus() }
  }

  componentDidMount = () => {
    window.addEventListener('add-mention', this.handleAddMention);
    this.focus();
  }

  componentWillUnmount = () => {
    window.removeEventListener('add-mention', this.handleAddMention);
  }

  logState = () => {
    console.log('State', JSON.stringify(this.state.editorState, null, 4))
  }

  getEditorState = () => {
    return this.state.editorState;
  }

  updateEditor = (editorState) => {
    this.setState({
      editorState: editorState
    })
  }

  handleAddMention = (e) => {
    const mentionData = e.detail;
    if(mentionData) {
      const newEditorState = addCustomBlocks(
        this.state.editorState,
        'MENTION',
        mentionData
      );
      this.updateEditor(newEditorState);
    }
  }

  render() {
    return (
      <div className='editor-container'>
        <div id='editor'>
          <Editor
            editorState={this.state.editorState}
            onChange={(editorState) => {
              this.updateEditor(editorState)
            }}
            ref={this.editorRef}
          />
        </div>
      </div>
    );
  }
}

export default App;

