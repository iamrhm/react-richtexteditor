import React, { Component } from "react";
import { EditorState, SelectionState, Modifier } from "draft-js";

export default class CustomComponentBlock extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.props.blockProps.onChange;
  }

  updateData = (data) => {
    const editorState = this.props.blockProps.getEditorState();
    const content = editorState.getCurrentContent();
    const selection = new SelectionState({
      anchorKey: this.props.block.key,
      anchorOffset: 0,
      focusKey: this.props.block.key,
      focusOffset: this.props.block.getLength()
    });

    const newContentState = Modifier.mergeBlockData(content, selection, data);
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "change-block-data"
    );
    this.onChange(newEditorState);
  }

  render() {
    const data = this.props.block.getData().toJS();
    const { plugin } = this.props.blockProps;
    const Block = plugin.blockComponent;

    return (
      <div
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      >
        <Block
          data={data}
          container={this}
          blockProps={this.props.blockProps}
        />
      </div>
    );
  }
}