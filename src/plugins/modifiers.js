import {
  insertMentionBlock,
  addMentionTrigger
} from './mention/modifier';

function addCustomBlocks(
  editorState,
  blockType,
  data,
) {
  switch(blockType) {
    case 'MENTION':
      return insertMentionBlock(editorState, data);
    case 'ADD_MENTION_TRIGGER':
      return addMentionTrigger(editorState, data);
    default:
      return;
  }
}

export default addCustomBlocks