import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  CompositeDecorator,
  RichUtils,
  Modifier,
  AtomicBlockUtils
} from 'draft-js';

import {cunstomButtonMap,customStyleMap,customEntityMap} from './config/custom-style';

import InputPanel from './components/input-button';
import InputDialog from './components/input-dialog';
import LinkComponent from './components/link-component';
import Image from './components/image-component'

import './App.css';


function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    }, callback);
}

class App extends Component {
  constructor(props) {
    super(props)
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: LinkComponent,
      },
    ]);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
      openInputDialouge: false,
      userInputType: '',
      userInputLink: '',
    }
    this.focus = () => { this.refs.editorRef.focus() }
  }

  componentDidMount = () => {
    this.focus()
  }

  userEventListner = (e, key) => {
    console.log(key)
    e.preventDefault();
    if (customStyleMap[key] !== undefined) {
      this.toggleStyle(key)
    } 
    else if (customEntityMap[key] !== undefined) {
      if(key === 'image'){
        let el = e.target
        this.addImage(el)
      }
      else if(key === 'link'){
        this.setState({
          openInputDialouge: true,
          userInputType : key
        });
      }
    }
  }

  toggleStyle = (toggledStyle) => {
    /* check event*/
    console.log('ChangeStyle', toggledStyle);

    const { editorState } = this.state;
    const selection = editorState.getSelection();

    /* All Inline style removed for that selection */
    const nextContentState = Object.keys(customStyleMap)
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

    if (!currentStyle.has(toggledStyle)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledStyle
      );
    }
    this.updateEditor(nextEditorState)
  }

  onInputChange = (e,entityType) => {
    e.preventDefault()
    let el = e.target
    let newInput
    if(entityType === 'link'){
      newInput = el.value;
      this.setState({ userInputLink: newInput }) 
    }
  }

  addNewEntity = (e,entityType) => {
    e.preventDefault()
    if(entityType ==='link'){
        this.addLink()
    }
  }

  addImage = (el) =>{
    const data = el.files[0]
   const fr = new FileReader();
   fr.readAsDataURL(data)
   fr.addEventListener('load', (e) =>{
      this.createImageEntity({src : e.target.result, data:'Text'})
   })
  }

  createImageEntity =(data) =>{
    const {editorState} = this.state
    const contentState = editorState.getCurrentContent()
    const newContentState = contentState.createEntity("IMAGE","IMMUTABLE",data)
    const entityKey = newContentState.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: newContentState
    });
    this.setState({
      editorState : AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    })
  }

  cunstomeBlockRender = (block) =>{
    if(block.getType() === "atomic"){
      const {editorState} = this.state;
      const contentState = editorState.getCurrentContent()
      const entityKey = block.getEntityAt(0);
      if(contentState.getEntity(entityKey).type === 'IMAGE'){
        return {
          component : Image,
          editable : false,
        }
      }
    }
  }

  addLink = () =>{
    const { editorState, userInputLink } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: userInputLink }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    var selection = newEditorState.getSelection();
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        selection,
        entityKey
      ),
      openInputDialouge: false,
      userInputLink: ''
    }, () => {setTimeout(this.focus(),0)});
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
        <InputPanel
          editorState={this.state.editorState}
          buttonValues={cunstomButtonMap}
          userEventListner={this.userEventListner}
        />
        <InputDialog
          entityType = {this.state.userInputType}
          open={this.state.openInputDialouge}
          onChange={this.onInputChange}
          saveInput={this.addNewEntity}
          onClose={this.closeDialougeBox}
          userInputLink={this.state.userInputLink}
        />
        <Editor
          customStyleMap={customStyleMap}
          editorState={this.state.editorState}
          onChange={(editorState) => { this.updateEditor(editorState) }}
          blockRendererFn = {(block) => this.cunstomeBlockRender(block)}
          ref="editorRef"
        />
      </div>
    );
  }
}

export default App;

