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

class RichEditor extends Component {
  constructor(props) {
    super(props)
    const decorator = new CompositeDecorator(
      getDecorators(props.context)
    );
    this.state = {
      editorState: EditorState.createEmpty(decorator),
    }
    this.editorRef = React.createRef();
    this.editorContainer = React.createRef();
    this.focus = () => {
      this.editorRef.current.focus();
    }
  }

  componentDidMount = () => {
    const { context } = this.props;
    const draftEditor = (this.editorRef.current||{}).editor;
    draftEditor.setAttribute('data-gramm', 'false');
    context.setEditorState(this.state.editorState);
    this.focus();
    this.props.onFocusCb();
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.setTrigger && !prevProps.setTrigger) {
      this.addMentionTrigger();
      this.props.addTriggerAfterCb();
    }
  }

  logState = () => {
    console.log('State', JSON.stringify(this.state.editorState, null, 4));
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
    const { trigger = '@' } = context.store;
    const newEditorState = addCustomBlocks(
      this.state.editorState,
      'MENTION',
      {mention: mentionData, trigger: trigger}
    );
    this.setState({
      editorState: newEditorState
    }, () => {
      context.setEditorState(this.state.editorState);
      context.setShowMention(false, mentionData, null);
    });
    this.props.addMentionCb(mentionData);
  }

  addMentionTrigger = () => {
    const { context = {} } = this.props;
    const { trigger = '@' } = context.store;
    const newEditorState = addCustomBlocks(
      this.state.editorState,
      'ADD_MENTION_TRIGGER',
      trigger
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
        <div className='editor-container'>
          <div id='editor' ref={this.editorContainer}>
            <Editor
              placeholder={`Write something and to tag super heros use ${this.props.trigger}`}
              editorState={this.state.editorState}
              onChange={(editorState) => {
                this.setEditorState(editorState)
              }}
              ref={this.editorRef}
            />
          </div>
          <MentionSuggestion
            {...this.props}
            ref={this.props.editorContainerRef}
            handleAddMention={this.handleAddMention}
          />
        </div>
      </>
    );
  }
}

export default withConsumer(RichEditor);

