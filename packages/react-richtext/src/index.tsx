import React from 'react';

import Provider from './editor/context/Provider';
import RichEditor from './editor/RichEditor';
import useForwardedRef from './editor/libs/hooks/useForwardedRef';

export default React.forwardRef<HTMLDivElement, Omit<IEditorProps, 'editorContainerRef'>>(
  (props, ref): JSX.Element => {
  const innerRef = useForwardedRef(ref);
  return (
    <Provider {...props}>
      <RichEditor
        {...props}
        editorContainerRef={innerRef}
      />
    </Provider>
  )
});