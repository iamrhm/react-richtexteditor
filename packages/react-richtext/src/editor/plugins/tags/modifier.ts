import { EditorState, Modifier } from 'draft-js';
import { IEntityInfo } from '@packages/types';

import getSearchText from './utils/getSearchText';

export interface IAddEntity {
  editorState: EditorState;
  blockType: 'TAG_ENTITY';
  tagData: {
    entityInfoData: IEntityInfo;
    triggerKey: string;
  };
}

export interface IAddEntityTrigger {
  editorState: EditorState;
  blockType: 'ADD_TRIGGER';
  triggerKey: string;
}

export function insertMentionBlock(data: IAddEntity): EditorState {
  const { editorState, tagData } = data;
  try {
    const { entityInfoData, triggerKey } = tagData;
    const mentionDisplayText = `${entityInfoData.viewText}`;

    const contentStateWithEntity = editorState
      .getCurrentContent()
      .createEntity('TAG_ENTITY', 'IMMUTABLE', entityInfoData);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const selectionState = editorState.getSelection();
    const { begin, end } = getSearchText(editorState, selectionState, triggerKey);

    const mentionTextSelection = selectionState.merge({
      anchorOffset: begin,
      focusOffset: end,
    });

    let mentionReplacedContent = Modifier.replaceText(
      editorState.getCurrentContent(),
      mentionTextSelection,
      mentionDisplayText,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );

    const blockKey = mentionTextSelection.getAnchorKey();
    const blockSize = editorState.getCurrentContent().getBlockForKey(blockKey).getLength();

    if (blockSize === end) {
      mentionReplacedContent = Modifier.insertText(
        mentionReplacedContent,
        mentionReplacedContent.getSelectionAfter(),
        ' ',
      );
    }

    const newEditorState = EditorState.push(editorState, mentionReplacedContent, 'insert-fragment');
    return EditorState.forceSelection(newEditorState, mentionReplacedContent.getSelectionAfter());
  } catch (error) {
    console.error(error);
    return editorState;
  }
}

export function addMentionTrigger(data: IAddEntityTrigger): EditorState {
  const { editorState, triggerKey } = data;
  try {
    const selectionState = editorState.getSelection();
    const mentionReplacedContent = Modifier.insertText(editorState.getCurrentContent(), selectionState, triggerKey);
    const newEditorState = EditorState.push(editorState, mentionReplacedContent, 'insert-characters');

    return EditorState.forceSelection(newEditorState, mentionReplacedContent.getSelectionAfter());
  } catch (error) {
    console.error(error);
    return editorState;
  }
}
