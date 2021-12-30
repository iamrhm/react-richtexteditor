import React from 'react';

import withConsumer from '../../../../context/withConsumer';

import './style.css';

function MentionLink(props) {
  const {contentState, entityKey, children} = props;
  const mention = contentState.getEntity(entityKey).getData();
  const handleClick = () => {
    window.open(mention.link);
  }
  return (
    <a
      href={mention.link}
      className="mentioned-link"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

export default withConsumer(MentionLink);