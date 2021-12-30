import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  CompositeDecorator,
} from 'draft-js';

import getDecorators from './plugins/decorator';
import addCustomBlocks from './plugins/modifiers';
import withConsumer from './context/withConsumer';
import MentionSuggestion from './plugins/mention/components/suggestion';

import './App.css';

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
    const { store } = this.props.context;
    const mentionSuggestion =
    store.mention.show || (store.mention.elm !== null);

    return (
      <div className='editor-container'>
        <div id='editor'>
          <Editor
            editorState={this.state.editorState}
            onChange={(editorState) => {
              this.setEditorState(editorState)
            }}
            ref={this.editorRef}
          />
        </div>
        {
          mentionSuggestion ? (
            <MentionSuggestion
              handleAddMention={this.handleAddMention}
            />
          ) : null
        }
        <div className="action-panel">
          <button
            type="button"
            className="button-add-asset-tag"
            onClick={this.addMentionTrigger}
          >
            @
          </button>
        </div>
      </div>
    );
  }
}

export default withConsumer(App);

