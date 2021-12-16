const mentionRegex = /@[\w ]+/g;

function findMention(contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = mentionRegex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

export default findMention;
