import {
  EditorState,
} from 'draft-js';

import {
  insertMentionBlock,
  addMentionTrigger,

  IAddEntity,
  IAddEntityTrigger,
} from './tags/modifier';

function addCustomBlocks(
  data: IAddEntity | IAddEntityTrigger,
): EditorState {
  const { blockType } = data;

  switch (blockType) {
    case 'TAG_ENTITY':
      return insertMentionBlock(data as IAddEntity);
    case 'ADD_TRIGGER':
      return addMentionTrigger(data as IAddEntityTrigger);
    default:
      // eslint-disable-next-line consistent-return
      return;
  }
}

export default addCustomBlocks;
