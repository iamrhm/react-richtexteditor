import React from 'react';

import Provider from './editor/context/Provider';
import RichEditor from './editor/RichEditor';
import useForwardedRef from './editor/libs/hooks/useForwardedRef';
import { IEditorProps } from '@packages/types';

export default React.forwardRef<HTMLDivElement, Omit<IEditorProps, 'editorContainerRef'>>((props, ref): JSX.Element => {
  const innerRef = useForwardedRef(ref);
  return (
    <Provider {...props}>
      <RichEditor {...props} editorContainerRef={innerRef} />
    </Provider>
  );
});

export { parseEditorData, parseRichDataToUI } from './utils/parser.utils';

export type {
  IEntityInfo,
  IEntity,
  IEntityMap,
  IParsedRichData,
  IRichShaveFormat,
  IRenderHint,
  IRenderSuggestions,
  IFetchSuggestions,
  IHandleLinks,
  IHandleEntitiesCb,
  IEditorProps,
  IEditorProviderState,
  IEditorContext,
  IContentType,
  IEditorState,
} from '@packages/types';
