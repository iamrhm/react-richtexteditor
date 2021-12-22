import linkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = linkifyIt().tlds(tlds);

function findLink(contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr = linkify.match(text);
  const href = matchArr && matchArr[0] ? matchArr[0].url : null;
  if (href !== null) {
    callback(matchArr[0].index, matchArr[0].lastIndex);
  }
}

export default findLink;