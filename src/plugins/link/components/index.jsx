/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

import withConsumer from '../../../context/withConsumer';

import './style.module.css';

const LinkComponent = (props) => {
  const {context, decoratedText} = props;
  const linkify = linkifyIt().tlds(tlds);
  const [url, setUrl] = React.useState('');

  React.useEffect(() => {
    const matchArr = linkify.match(decoratedText);
    const href = matchArr && matchArr[0] ? matchArr[0].url : null;
    context.setPreviewLink({
      url: href,
      offsetKey: props.offsetKey,
    });
    setUrl(href);
    return () => {
      context.deletePreviewLink(decoratedText)
    }
  }, [decoratedText]);

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

export default withConsumer(LinkComponent);