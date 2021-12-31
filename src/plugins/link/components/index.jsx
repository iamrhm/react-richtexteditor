/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import withConsumer from '../../../context/withConsumer';

import './style.css';

const LinkComponent = (props) => {
  const href = props.decoratedText;
  console.log(href);
  React.useEffect(() => {
  }, [href]);

  const handleClick = () => {
    window.open(href);
  }
  return (
    <a
      className="external-link"
      href={href}
      onClick={handleClick}
    >
      {props.children}
    </a>
  );
};

export default withConsumer(LinkComponent);