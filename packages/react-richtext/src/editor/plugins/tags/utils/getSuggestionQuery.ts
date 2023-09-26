import { EditorState } from 'draft-js';

const decodeOffsetKey = (
  offsetKey: string,
): {
  blockKey: string;
  decoratorKey: number;
  leafKey: number;
} => {
  const [blockKey, decoratorKey, leafKey] = offsetKey.split('-');
  return {
    blockKey,
    decoratorKey: parseInt(decoratorKey, 10),
    leafKey: parseInt(leafKey, 10),
  };
};

export default function getSuggestionQuery(
  editorState: EditorState,
  searchKeys: Set<string>,
  trigger = ['@'],
): {
  suggestionText: string;
  offsetKey: string;
  triggerKey: string;
} {
  const selection = editorState.getSelection();
  const anchorKey = selection.getAnchorKey();
  const anchorOffset = selection.getAnchorOffset();
  const allSearchBlocks = Array.from(searchKeys).map((offsetKey) => decodeOffsetKey(offsetKey));
  let triggerKey = null;

  if (!allSearchBlocks) {
    return null;
  }

  const searchLeaves = [...allSearchBlocks]
    .filter((data) => data !== undefined)
    .filter((offsetDetail) => offsetDetail.blockKey === anchorKey)
    .map((offsetDetail) => ({
      leaf: editorState.getBlockTree(offsetDetail.blockKey).getIn([offsetDetail.decoratorKey]),
      offsetKey: Object.values(offsetDetail).join('-'),
    }));

  if (!searchLeaves) {
    return null;
  }

  const blockText = editorState.getCurrentContent().getBlockForKey(anchorKey).getText();

  const activeSearch = searchLeaves
    .filter((data) => data.leaf !== undefined)
    .filter(({ leaf }) => {
      triggerKey = blockText.substr(leaf.start, trigger[0].length);
      return (
        anchorOffset >= leaf.start + triggerKey.length &&
        blockText.substr(leaf.start, triggerKey.length) === triggerKey &&
        anchorOffset <= leaf.end
      );
    })[0];

  if (!activeSearch) {
    return null;
  }

  const searchText = blockText.substr(activeSearch.leaf.start, anchorOffset - activeSearch.leaf.start);

  return {
    suggestionText: searchText,
    offsetKey: activeSearch.offsetKey,
    triggerKey,
  };
}
