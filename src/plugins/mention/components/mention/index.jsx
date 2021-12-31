/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import withConsumer from '../../../../context/withConsumer';

import './style.css';

const MentionComponent = (props) => {
  const {
    setShowMention,
    registerMentionPortal,
    unregisterMentionPortal
  } = props.context;
  const newMentionPortal = React.useRef();

  React.useLayoutEffect(() => {
    setShowMention(
      true,
      undefined,
      props.offsetKey
    );
    if(newMentionPortal.current) {
      registerMentionPortal(
        props.offsetKey,
        newMentionPortal.current
      )
    }
    return () => {
      setShowMention(false, null);
      unregisterMentionPortal(props.offsetKey);
    }
  }, []);

  return (
    <span className="mention-text" ref={newMentionPortal}>{props.children}</span>
  );
}

export default withConsumer(MentionComponent);
