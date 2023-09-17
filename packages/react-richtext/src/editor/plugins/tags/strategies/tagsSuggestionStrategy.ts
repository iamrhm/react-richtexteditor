/* eslint-disable no-cond-assign */
import { ContentBlock } from 'draft-js';
import defaultTagRegExp from '../../../constants/defaultTagRegExp';

function getTagRegex(triggers: Array<string>): Array<RegExp> {
  return triggers.map(trigger => new RegExp(`${trigger}(${defaultTagRegExp}|\\s)*`, 'g'));
}

function checkForWhiteSpaceBeforeTrigger(text: string, index: number): boolean {
  if (index === 0) {
    return true;
  }
  return /\s/.test(text[index - 1]);
}

const tagsSuggestionStrategy = (context: IEditorContext) => (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
): void => {
  const text = contentBlock.getText();
  const triggers = (context.store || {}).possibleTriggerKeys || ['@'];
  const possibleTagRegex = getTagRegex(triggers);
  let matchArr = undefined;
  let start = undefined;

  for (let i = 0; i < possibleTagRegex.length; i++) {
    while ((matchArr = possibleTagRegex[i].exec(text)) !== null) {
      start = matchArr.index;
      const end = start + matchArr[0].length;
      if (
        checkForWhiteSpaceBeforeTrigger(text, matchArr.index)
      ) {
        callback(start, end);
      }
    }
  }
};

export default tagsSuggestionStrategy;
