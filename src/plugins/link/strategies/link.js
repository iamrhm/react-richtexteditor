const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

function findLink(contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = urlRegex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

export default findLink;