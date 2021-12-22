import {
  EditorState,
  Modifier,
} from "draft-js";

import getSearchText from './utils/getSearchText';

function insertMentionBlock(editorState, mentionData){
  const contentStateWithEntity = editorState
  .getCurrentContent()
  .createEntity(
    'MENTION',
    'IMMUTABLE',
    mentionData
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const selectionState = editorState.getSelection();
  const { begin, end } = getSearchText(editorState, selectionState);

  const mentionTextSelection = selectionState.merge({
    anchorOffset: begin,
    focusOffset: end,
  });
  let mentionReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    mentionTextSelection,
    `@${mentionData.title}`,
    editorState.getCurrentInlineStyle(),
    entityKey
  );

  const blockKey = mentionTextSelection.getAnchorKey();
  const blockSize = editorState
    .getCurrentContent()
    .getBlockForKey(blockKey)
    .getLength();
  if (blockSize === end) {
    mentionReplacedContent = Modifier.insertText(
      mentionReplacedContent,
      mentionReplacedContent.getSelectionAfter(),
      ' '
    );
  }

  const newEditorState = EditorState.push(
    editorState,
    mentionReplacedContent,
    'insert-fragment'
  );
  return EditorState.forceSelection(
    newEditorState,
    mentionReplacedContent.getSelectionAfter()
  );
}

export default insertMentionBlock;