const decodeOffsetKey = (offsetKey) => {
  const [blockKey, decoratorKey, leafKey] = offsetKey.split('-');
  return {
    blockKey,
    decoratorKey: parseInt(decoratorKey, 10),
    leafKey: parseInt(leafKey, 10),
  };
};

export default function getSuggestionQuery(
  editorState,
  searchKeys,
) {
  const selection = editorState.getSelection();
  const anchorKey = selection.getAnchorKey();
  const anchorOffset = selection.getAnchorOffset();
  const allSearchBlocks = [...searchKeys].map((offsetKey) =>
    decodeOffsetKey(offsetKey)
  );

  if(!allSearchBlocks) {
    return null;
  }

  const searchLeaves = [...allSearchBlocks]
    .filter(data => data !== undefined)
    .filter((offsetDetail) => offsetDetail.blockKey === anchorKey)
    .map((offsetDetail) => ({
        leaf: editorState
        .getBlockTree(offsetDetail.blockKey)
        .getIn([offsetDetail.decoratorKey]),
        offsetKey: Object.values(offsetDetail).join('-'),
      })
    );

  if(!searchLeaves) {
    return null;
  }

  const blockText = editorState
  .getCurrentContent()
  .getBlockForKey(anchorKey)
  .getText();

  const activeSearch = searchLeaves
  .filter(data => data.leaf !== undefined)
  .filter(
  ({ leaf }) =>
    (anchorOffset >= leaf.start + 1) &&
    (blockText.substr(leaf.start, 1) === '@') &&
    (anchorOffset <= leaf.end)
  )[0];

  if(!activeSearch) {
    return null;
  }

  const searchText = blockText.substr(
    activeSearch.leaf.start,
    activeSearch.leaf.end - activeSearch.leaf.start
  );

  return {
    suggestionText: searchText,
    offsetKey: activeSearch.offsetKey,
  };
}
