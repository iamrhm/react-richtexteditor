/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import withConsumer from '../../../context/withConsumer';

import './style.module.css';

const LinkComponent = (props) => {
  const {context, decoratedText} = props;

  React.useEffect(() => {
    context.addNewLink({
      url: decoratedText,
      offsetKey: props.offsetKey,
    });
  }, [decoratedText]);

  React.useEffect(() => {
    return () => {
      context.deleteLink(props.offsetKey);
    }
  }, []);

  return (
    <a
      className="external-link"
      href={decoratedText}
    >
      {props.children}
    </a>
  );
};

export default withConsumer(LinkComponent);