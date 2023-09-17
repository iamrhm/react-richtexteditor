import React from 'react';

import Provider from './context/Provider';
import RichEditor from './RichEditor';
import useForwardedRef from './libs/hooks/useForwardedRef';

export default React.forwardRef<HTMLDivElement, IEditorProps>(
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