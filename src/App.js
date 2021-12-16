import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  CompositeDecorator,
} from 'draft-js';

import decoratorArray from './decorators';
import insertDataBlock from './helpers/insertBlock';
import CustomComponentBlock from './components/custom-block';
import { customEntityMap } from './config/custom-entities';
import DEFAULT_PLUGINS from './plugin'

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
    this.focus()
  }

  getPluginByType = (type) => {
    for (let plugin of DEFAULT_PLUGINS) {
      if (plugin.type.toUpperCase() === type.toUpperCase()) {
        return plugin;
      }
    };
  }

  userEventListner = (e, eventType) => {
    e.preventDefault();
    if (customEntityMap[eventType] !== undefined) {
      switch (eventType) {
        case 'image':
          const img = e.target.files[0]
          if(!img)
            break;
          const fr = new FileReader();
          fr.readAsDataURL(img)
          fr.addEventListener('load', (e) => {
            const newEditorState = insertDataBlock(
              this.state.editorState,
              { src: e.target.result, type: "image", caption: '' }
            );
            this.updateEditor(newEditorState);
          })
          break;
        case 'log':
          this.logState()
          break;
        default:
          break;
      }
    }
  }

  logState = () => {
    console.log('State', JSON.stringify(this.state.editorState, null, 4))
  }

  addNewEntity = (e, entityType) => {
    e.preventDefault();
  }

  getEditorState = () => {
    return this.state.editorState;
  }

  customBlockRender = (block) => {
    if (block.getType() !== "atomic") {
      return null;
    }
    const type = block.getData().toObject().type;
    const plugin = this.getPluginByType(type);
    return {
      component: CustomComponentBlock,
      editable: false,
      props: {
        plugin: plugin,
        onChange: this.updateEditor,
        editorState: this.state.editorState,
        getEditorState: this.getEditorState,
      },
    };
  }

  blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === "unstyled") {
      return "";
    }
  }

  updateEditor = (editorState) => {
    this.setState({
      editorState: editorState
    })
  }

  render() {
    return (
      <div className='editor-container'>
        <div id='editor'>
          <Editor
            // blockRendererFn={(block) => this.customBlockRender(block)}
            editorState={this.state.editorState}
            onChange={(editorState) => { this.updateEditor(editorState) }}
            ref={this.editorRef}
          />
        </div>
      </div>
    );
  }
}

export default App;

