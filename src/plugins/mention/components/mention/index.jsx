import React from 'react';

import withConsumer from '../../../../context/withConsumer';

import './style.css';

const MentionComponent = (props) => {
  const { context } = props;
  const mentionElm = React.useRef();

  React.useLayoutEffect(() => {
    context.setShowMention(true, mentionElm.current);
    return () => {
      context.setShowMention(false, null);
    }
  }, []);

  return (
    <span ref={mentionElm}>{props.children}</span>
  );
}


export default withConsumer(MentionComponent);