import React from 'react';

import './style.css';

const LinkComponent = (props) => {
  const url = props.decoratedText;
  return (
    <a href={url}>
      {props.children}
    </a>
  );
};

export default LinkComponent;