import { ContentBlock, ContentState } from 'draft-js';

const tagStrategy =
  () =>
  (contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState): void => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'TAG_ENTITY';
    }, callback);
  };

export default tagStrategy;
