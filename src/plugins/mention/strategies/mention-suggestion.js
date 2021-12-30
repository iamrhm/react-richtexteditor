const mentionRegex = /@([\w-À-ÖØ-öø-ÿĀ-ňŊ-ſА-я぀-ゟ゠-ヿ㄰-㆏가-힣一-龥؀-ۿÀ-ỹ]|\s)*/g;

function checkForWhiteSpaceBeforeTrigger(text, index) {
  if (index === 0) {
    return true;
  }
  return /\s/.test(text[index - 1]);
}


const findMentionSuggestion = (context) => (contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr;
  let start;

  while ((matchArr = mentionRegex.exec(text)) !== null) {
    start = matchArr.index;
    const end = start + matchArr[0].length;
    if (checkForWhiteSpaceBeforeTrigger(text, matchArr.index)) {
      callback(start, end);
    }
  }
}

export default findMentionSuggestion;
