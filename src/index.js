import React from 'react';
import Provider from './context/Provider';
import RichEditor from './RichEditor';

function Index(
  props = {
    setTrigger: false,
    trigger: '@',
    editorContainerRef: {},
    setEditorState: () => {},
    fetchSuggestions: () => ({
      suggestion: [],
      showHint: false,
    }),
    renderSuggestions: () => null,
    renderHint: () => null,
    addTriggerAfterCb: () => {},
    setPreviewLink: () => {},
    onFocusCb: () => {},
  }
) {
  return (
    <Provider {...props}>
      <RichEditor
        {...props}
      />
    </Provider>
  )
}

export default React.forwardRef((props, ref) => <Index
  editorContainerRef={ref} {...props}
/>);