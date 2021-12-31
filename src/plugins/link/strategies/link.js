import linkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = linkifyIt().tlds(tlds);

const findLink = (context) => (contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr = linkify.match(text) || [];
  let href;

  matchArr.forEach((match) => {
    href = match ? match.url : null;
    if (href !== null) {
      callback(match.index, match.lastIndex);
    }
  })
}

export default findLink;