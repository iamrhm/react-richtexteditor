import React from 'react';
import { IEditorContext } from '../../../../../types';

import withConsumer from '../../../context/withConsumer';

interface IProps {
  context: IEditorContext;
  children: React.ReactNode;
  offsetKey: string;
}

const TagSuggestionAnchor = (props: IProps): JSX.Element => {
  const { setShowSuggestions, registerSuggestionPortal } = props.context;
  const newTagPortal = React.useRef();

  React.useLayoutEffect(() => {
    setShowSuggestions(true, props.offsetKey);
    if (newTagPortal.current) {
      registerSuggestionPortal(newTagPortal.current, props.offsetKey);
    }
    return (): void => {
      setShowSuggestions(false, props.offsetKey);
    };
  }, []);

  return (
    <span className="tagged-text" ref={newTagPortal}>
      {props.children}
    </span>
  );
};

export default withConsumer(TagSuggestionAnchor);
