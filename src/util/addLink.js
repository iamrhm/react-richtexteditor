import {
  EditorState,
  RichUtils,
} from 'draft-js';

function addLink({ editorState, userInputLink }) {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'LINK',
    'MUTABLE',
    { url: userInputLink }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
  var selection = newEditorState.getSelection();
  return RichUtils.toggleLink(
    newEditorState,
    selection,
    entityKey
  )
}
export default addLink