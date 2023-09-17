import linkifyIt from 'linkify-it';
import tlds from 'tlds';
import { ContentBlock } from 'draft-js';

const linkify = linkifyIt().tlds(tlds);

const findLink = () => (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
): void => {
  const text = contentBlock.getText();
  const matchArr = linkify.match(text) || [];
  let href = undefined;

  matchArr.forEach((match) => {
    href = match ? match.url : null;
    if (href !== null) {
      callback(match.index, match.lastIndex);
    }
  });
};

export default findLink;
