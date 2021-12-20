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
    .map((offsetDetail) =>
      editorState
        .getBlockTree(offsetDetail.blockKey)
        .getIn([offsetDetail.decoratorKey])
    );

  if(!searchLeaves) {
    return null;
  }

  const blockText = editorState
  .getCurrentContent()
  .getBlockForKey(anchorKey)
  .getText();

  const activeSearch = searchLeaves
  .filter(data => data !== undefined)
  .filter(
  ({ start, end }) =>
    (anchorOffset >= start + 1) &&
    (blockText.substr(0, 1) === '@') &&
    (anchorOffset <= end)
  )[0];

  if(!activeSearch) {
    return null;
  }

  const searchText = blockText.substr(activeSearch.start, anchorOffset);
  return searchText.length >= 3 ? searchText : null;
}
