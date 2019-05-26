import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  CompositeDecorator,
  RichUtils,
  Modifier,
} from 'draft-js';

import decoratorArray from './decorators'
import insertDataBlock from './util/insertCustomeBlock'
import addLink from "./util/addLink"
import CustomeComponentBlock from './components/custome-component-block'
import { cunstomButtonMap, customStyleMap, customEntityMap } from './config/buttonInputList';
import DEFAULT_PLUGINS from './plugin'

import InputButtonList from './components/input-button-list';
import InputModal from './components/input-modal';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    const decorator = new CompositeDecorator(decoratorArray);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
      openInputDialouge: false,
      userInputType: '',
      userInputLink: '',
      readOnly: false,
      getInitialReadOnly: this.getInitialReadOnly,
      setInitialReadOnly: this.setInitialReadOnly
    }
    this.focus = () => { this.refs.editorRef.focus() }
  }

  componentDidMount = () => {
    this.focus()
  }

  getInitialReadOnly = () => {
    return this.props.readOnly || false;
  }

  setInitialReadOnly = () => {
    let readOnly = this.props.readOnly || false;
    this.setState({ readOnly });
  }

  setReadOnly = (readOnly) => {
    this.setState({ readOnly: readOnly });
  }

  getReadOnly = () => {
    return this.state.readOnly;
  }

  getPluginsByType = (type) => {
    let pluginsByType = {};
    for (let plugin of DEFAULT_PLUGINS) {
      if (plugin.type.toUpperCase() === type.toUpperCase())
        pluginsByType = plugin;
    }
    return pluginsByType;
  }

  userEventListner = (e, eventType) => {
    e.preventDefault();
    if (customStyleMap[eventType] !== undefined) {
      this.toggleStyle(eventType)
    }
    else if (customEntityMap[eventType] !== undefined) {
      switch (eventType) {
        case 'link':
          this.setState({
            openInputDialouge: true,
            userInputType: eventType
          });
          break;
        case 'image':
          {
            debugger
            const img = e.target.files[0]
            if(!img)
              break;
            const fr = new FileReader();
            fr.readAsDataURL(img)
            fr.addEventListener('load', (e) => {
              this.updateEditor(insertDataBlock(this.state.editorState,
                { src: e.target.result, type: "image", caption: '' }
              ))
            })
            break;
          }
        case 'break': {
          let data = { type: "horizontalrule" };
          this.updateEditor(insertDataBlock(this.state.editorState, data));
          break;
        }
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

  toggleStyle = (toggledStyle) => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const nextContentState = Object.keys(customStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }
    if (!currentStyle.has(toggledStyle)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledStyle
      );
    }
    this.updateEditor(nextEditorState)
  }

  onInputChange = (e, entityType) => {
    e.preventDefault()
    let el = e.target
    let newInput
    if (entityType === 'link') {
      newInput = el.value;
      this.setState({ userInputLink: newInput })
    }
  }

  addNewEntity = (e, entityType) => {
    e.preventDefault()
    if (entityType === 'link') {
      const editorState = addLink(this.state)
      this.setState({
        editorState: editorState,
        openInputDialouge: false,
        userInputLink: ''
      },()=>{this.focus()})
    }
  }

  getEditorState = () => {
    return this.state.editorState
  }

  cunstomeBlockRender = (block) => {
    if (block.getType() !== "atomic") {
      return null;
    }

    const type = block.getData().toObject().type

    let plugin = this.getPluginsByType(type);
    return {
      component: CustomeComponentBlock,
      editable: false,
      props: {
        plugin: plugin,
        onChange: this.updateEditor,
        editorState: this.state.editorState,
        getEditorState: this.getEditorState,
        setReadOnly: this.setReadOnly,
        getReadOnly: this.getReadOnly,
        getInitialReadOnly: this.getInitialReadOnly,
        setInitialReadOnly: this.setInitialReadOnly
      }
    }
  }

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    this.logState(newEditorState)
    if (newEditorState) {
      this.updateEditor(newEditorState)
      return true;
    } else {
      return false;
    }
  }

  blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === "unstyled") {
      return "paragraph";
    }
  }

  closeDialougeBox = (e) => {
    e.preventDefault();
    this.setState({
      openInputDialouge: false,
      userInputLink: ''
    })
  }

  updateEditor = (editorState) => {
    this.setState({
      editorState: editorState
    })
  }

  render() {
    return (
      <div className='editor-container'>
        <InputButtonList
          editorState={this.state.editorState}
          buttonValues={cunstomButtonMap}
          userEventListner={this.userEventListner}
        />
        <InputModal
          entityType={this.state.userInputType}
          open={this.state.openInputDialouge}
          onChange={this.onInputChange}
          saveInput={this.addNewEntity}
          onClose={this.closeDialougeBox}
          userInputLink={this.state.userInputLink}
        />
        <div id='editor'>
          <Editor
            readOnly={this.state.readOnly}
            customStyleMap={customStyleMap}
            blockStyleFn={this.blockStyleFn}
            blockRendererFn={(block) => this.cunstomeBlockRender(block)}
            editorState={this.state.editorState}
            onChange={(editorState) => { this.updateEditor(editorState) }}
            handleKeyCommand={this.handleKeyCommand}
            ref="editorRef"
          />
        </div>
      </div>
    );
  }
}

export default App;

