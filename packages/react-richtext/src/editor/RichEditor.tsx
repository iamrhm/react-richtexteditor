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

import TagSuggestionPopup from './plugins/tags/components/TagSuggestionPopup';
import { IEditorContext, IEditorProps, IEntityInfo } from '../types';

interface IProps extends IEditorProps {
  context?: IEditorContext;
  initialState?: EditorState;
}
interface IState {
  editorState: EditorState
}

class RichEditor extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const decorator = new CompositeDecorator(
      getDecorators(props.context),
    );
    this.state = {
      editorState: props.initialState ?
        EditorState.set(props.initialState, { decorator }) :
        EditorState.createEmpty(decorator),
    };
    this.editorRef = React.createRef();
    this.editorContainer = React.createRef();
    this.focus = (): void => {
      this.editorRef.current?.focus();
    };
  }

  componentDidMount = (): void => {
    const { context } = this.props;
    const draftEditor = this.editorRef.current?.editor;
    draftEditor?.setAttribute('data-gramm', 'false');
    context.setEditorState(this.state.editorState);
    this.focus();
    this.props.onFocusCb();
  }

  componentDidUpdate = (prevProps: IProps): void => {
    if (this.props.isTriggerInserted && !prevProps.isTriggerInserted) {
      this.addExternalTriggerKey(this.props.externalTriggerKey);
      this.props.resetIsTriggerInserted();
    }
  }

  logState = (): void => {
    console.log('State', JSON.stringify(this.state.editorState, null, 4));
  }

  setEditorState = (editorState: EditorState): void => {
    const { context } = this.props;
    this.setState({
      editorState,
    }, () => {
      context.setEditorState(this.state.editorState);
    });
  }

  handleAddEntity = (
    offsetKey: string,
    triggerKey: string,
    entityInfoData: IEntityInfo,
  ): void => {
    const { context } = this.props;
    const { editorState } = this.state;
    const newEditorState = addCustomBlocks({
      editorState,
      blockType: 'TAG_ENTITY',
      tagData: { entityInfoData, triggerKey },
    });
    this.setState({
      editorState: newEditorState,
    }, () => {
      context.setEditorState(this.state.editorState);
    });
    /* Because once asset is tagged we won't show suggestion any more */
    context.unregisterSuggestionPortal(offsetKey);
    this.props.handleEntitiesCb(
      entityInfoData,
      triggerKey,
    );
  }

  addExternalTriggerKey = (activeTriggerKey: string): void => {
    const { context } = this.props;
    const trigger = activeTriggerKey || '@';
    const { editorState } = this.state;
    const newEditorState = addCustomBlocks({
      editorState,
      blockType: 'ADD_TRIGGER',
      triggerKey: trigger,
    });
    this.setState({
      editorState: newEditorState,
    }, () => {
      context.setEditorState(this.state.editorState);
    });
  };

  editorRef: React.RefObject<Editor>;

  editorContainer: React.RefObject<HTMLDivElement>;

  focus: () => void;

  render(): JSX.Element {
    const compositeProps = {
      ...this.props,
      ref: this.props.editorContainerRef,
      handleAddEntity: this.handleAddEntity,
    };
    const styleClass = this.props.styleClass || '';

    return (
      <>
        <div className={`editor-container ${styleClass}`}>
          <div
            id="editor"
            ref={this.editorContainer}
            onClick={(): void => { this.editorRef.current?.focus(); }}
          >
            <Editor
              placeholder={this.props.placeholder}
              editorState={this.state.editorState}
              onChange={(editorState): void => {
                this.setEditorState(editorState);
              }}
              ref={this.editorRef}
              spellCheck={false}
              stripPastedStyles
            />
          </div>
          <TagSuggestionPopup
            {...compositeProps}
          />
        </div>
      </>
    );
  }
}

export default withConsumer(RichEditor);
