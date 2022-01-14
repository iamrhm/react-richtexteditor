import {
  EditorState,
  Modifier,
} from "draft-js";

import getSearchText from './utils/getSearchText';

export function insertMentionBlock(editorState, data){
  const { mention, trigger = '@'} = data;
  const contentStateWithEntity = editorState
  .getCurrentContent()
  .createEntity(
    'MENTION',
    'IMMUTABLE',
    mention
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const selectionState = editorState.getSelection();
  const { begin, end } = getSearchText(
    editorState,
    selectionState,
    trigger
  );

  const mentionTextSelection = selectionState.merge({
    anchorOffset: begin,
    focusOffset: end,
  });

  let mentionReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    mentionTextSelection,
    `${trigger}${mention.name}`,
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

export function addMentionTrigger(editorState, trigger) {
  const selectionState = editorState.getSelection();
  const mentionReplacedContent = Modifier.insertText(
    editorState.getCurrentContent(),
    selectionState,
    trigger,
  );
  const newEditorState = EditorState.push(
    editorState,
    mentionReplacedContent,
    'insert-characters'
  );

  return EditorState.forceSelection(
    newEditorState,
    mentionReplacedContent.getSelectionAfter()
  );
};