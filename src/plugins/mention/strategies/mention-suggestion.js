import defaultRegExp from './defaultRegExp';

function getMentionRegex(trigger){
  const MENTION_REGEX = new RegExp(`${trigger}(${defaultRegExp}|\\s)*`, 'g');
  return MENTION_REGEX;
}

function checkForWhiteSpaceBeforeTrigger(text, index) {
  if (index === 0) {
    return true;
  }
  return /\s/.test(text[index - 1]);
}

const findMentionSuggestion = (context) => (contentBlock, callback) => {
  const text = contentBlock.getText();
  const trigger = (context.store || {}).trigger || '@';
  const mentionRegex = getMentionRegex(trigger);
  let matchArr;
  let start;

  while ((matchArr = mentionRegex.exec(text)) !== null) {
    start = matchArr.index;
    const end = start + matchArr[0].length;
    if (
      checkForWhiteSpaceBeforeTrigger(text, matchArr.index)
    ) {
      callback(start, end);
    }
  }
}

export default findMentionSuggestion;
