/* eslint-disable import/no-anonymous-default-export */
export function getSearchTextAt(
  blockText,
  position,
  trigger
) {
  const str = blockText.substr(0, position);
  const TRIGGER_REGEX = new RegExp(`(\\s|^)(${trigger})`, 'g');
  const matches = str.matchAll(TRIGGER_REGEX);
  let triggerStartIndex = 0;
  let valueStartIndex = 0;
  for (const match of matches) {
    const spaceLen = match[1].length;
    const matchLen = match[2].length;
    triggerStartIndex = (match.index || 0) + spaceLen;
    valueStartIndex = triggerStartIndex + matchLen;
  }
  const matchingString = str.slice(valueStartIndex);
  const end = str.length;
  return {
    begin: triggerStartIndex,
    end,
    matchingString,
  };
}

export default (
  editorState,
  selection,
  trigger,
) => {
  const anchorKey = selection.getAnchorKey();
  const anchorOffset = selection.getAnchorOffset();
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(anchorKey);
  const blockText = currentBlock.getText();
  return getSearchTextAt(blockText, anchorOffset, trigger);
};
