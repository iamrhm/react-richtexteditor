import React from 'react';

import withConsumer from '../../../../context/withConsumer';

import './style.css';

const MentionComponent = (props) => {
  const { context } = props;
  const mentionPortal = React.useRef();

  React.useLayoutEffect(() => {
    context.setShowMention(
      true,
      mentionPortal.current,
      undefined,
      props.offsetKey
    );
    return () => {
      context.setShowMention(false, null);
    }
  }, []);

  return (
    <span className="mention-text" ref={mentionPortal}>{props.children}</span>
  );
}

export default withConsumer(MentionComponent);
