import addMentionBlock from './mention/modifier';

function addCustomBlocks(
  editorState,
  blockType,
  data,
) {
  switch(blockType) {
    case 'MENTION':
      return addMentionBlock(editorState, data);
    default:
      return;
  }
}

export default addCustomBlocks