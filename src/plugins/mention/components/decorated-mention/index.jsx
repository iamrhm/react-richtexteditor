import React from 'react';

import withConsumer from '../../../../context/withConsumer';

import './style.css';

function MentionLink(props) {
  const {contentState, entityKey, children} = props;
  const mention = contentState.getEntity(entityKey).getData();

  return (
    <a
      href={mention.link}
      className="mentioned-link"
    >
      {children}
    </a>
  );
}

export default withConsumer(MentionLink);