import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  CompositeDecorator,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

import getDecorators from './plugins/decorator';
import addCustomBlocks from './plugins/modifiers';
import withConsumer from './context/withConsumer';
import MentionSuggestion from './plugins/mention/components/suggestion';
import Header from './components/header';
import LinkPreview from './components/link-preview';

class App extends Component {
  constructor(props) {
    super(props)
    const decorator = new CompositeDecorator(
      getDecorators(props.context)
    );
    this.state = {
      editorState: EditorState.createEmpty(decorator),
    }
    this.editorRef = React.createRef();
    this.focus = () => { this.editorRef.current.focus() }
  }

  componentDidMount = () => {
    const { context } = this.props;
    const draftEditor = this.editorRef.current.editor;
    draftEditor.setAttribute('data-gramm', 'false');
    context.setEditorState(this.state.editorState);
    this.focus();
  }

  logState = () => {
    console.log('State', JSON.stringify(this.state.editorState, null, 4))
  }

  getEditorState = () => {
    return this.state.editorState;
  }

  setEditorState = (editorState) => {
    const { context } = this.props;
    this.setState({
      editorState: editorState
    }, () => {
      context.setEditorState(this.state.editorState);
    })
  }

  handleAddMention = (mentionData) => {
    const { context } = this.props;
    const newEditorState = addCustomBlocks(
      this.state.editorState,
      'MENTION',
      mentionData
    );
    this.setState({
      editorState: newEditorState
    }, () => {
      context.setEditorState(this.state.editorState);
      context.setShowMention(false, mentionData, null);
    })
  }

  addMentionTrigger = () => {
    const { context } = this.props;
    const newEditorState = addCustomBlocks(
      this.state.editorState,
      'ADD_MENTION_TRIGGER',
    );
    this.setState({
      editorState: newEditorState
    }, () => {
      context.setEditorState(this.state.editorState);
    })
  };

  render() {
    return (
      <>
        <Header />
        <div className='editor-container'>
          <div id='editor'>
            <Editor
              placeholder="Write something and to tag super heros use @"
              editorState={this.state.editorState}
              onChange={(editorState) => {
                this.setEditorState(editorState)
              }}
              ref={this.editorRef}
            />
          </div>
        </div>
        <LinkPreview {...this.props} />
        <MentionSuggestion
          handleAddMention={this.handleAddMention}
        />
        <div className="action-panel">
          <button
            type="button"
            className="button-add-asset-tag pointer"
            onClick={this.addMentionTrigger}
          >
            @
          </button>
        </div>
      </>
    );
  }
}

export default withConsumer(App);

