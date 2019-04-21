import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertFromHTML,
  convertToRaw,
  CompositeDecorator,
  Modifier
} from 'draft-js';


import InputPanel from './components/input-panel'

import './App.css';

const colorStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.editorRef = null
    this.setDOMref = (ref) => { this.editorRef = ref }
  }


  componentDidMount = () => {
    this.editorRef.focus()
  }

  toggleStyle = (toggledColor) => {
    /* check event*/
    console.log('ChangeStyle', toggledColor);

    const { editorState } = this.state;
    const selection = editorState.getSelection();

    /* All Inline style removed for that selection */
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    /* selection inline style */
    const currentStyle = editorState.getCurrentInlineStyle();
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }
    this.updateEditor(nextEditorState)
  }

  updateEditor = (editorState) => {
    this.setState({
      editorState: editorState
    })
  }

  changeStyle = () => {

  }
  render() {
    return (
      <div className='editor-container'>
        <InputPanel 
        buttonValues = {colorStyleMap} 
        toggleStyle = {this.toggleStyle}
        />
        <Editor
          customStyleMap={colorStyleMap}
          editorState={this.state.editorState}
          onChange={(editorState) => { this.updateEditor(editorState) }}
          ref={this.setDOMref}
        />
      </div>
    );
  }
}

export default App;
