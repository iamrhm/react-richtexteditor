import React from 'react';

import './LinkComponent.css';

const LinkComponent = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url}>
      {props.children}
      {console.log(props)}
    </a>
  );
};

export default LinkComponent;