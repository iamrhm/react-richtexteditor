import React from 'react';

import './style.css';

const LinkComponent = (props) => {
  const url = props.decoratedText;
  const handleClick = () => {
    window.open(url);
  }
  return (
    <a
      className="external-link"
      href={url}
      onClick={handleClick}
    >
      {props.children}
    </a>
  );
};

export default LinkComponent;