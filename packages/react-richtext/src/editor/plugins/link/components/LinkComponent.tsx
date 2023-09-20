import React from 'react';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';
import { IEditorContext, IEditorProps } from '@packages/types';

import withConsumer from '../../../context/withConsumer';
import useDebounce from '../../../libs/hooks/useDebounce';

interface IProps extends IEditorProps {
  context: IEditorContext;
  decoratedText: string;
  offsetKey: string;
  children: React.ReactNode;
}

const linkify = linkifyIt().tlds(tlds);

const LinkComponent = (props: IProps): JSX.Element => {
  const { context, decoratedText } = props;
  const debouncedDecoratedText = useDebounce(decoratedText, 300);

  const setUrlInfo = async (): Promise<void> => {
    const urlInfo = linkify.match(debouncedDecoratedText);
    let url = debouncedDecoratedText;
    urlInfo.forEach((match: {url: string}) => {
      url = match ? match.url : null;
    });
    context.addNewLink({
      meta: {
        url,
        viewText: debouncedDecoratedText,
      },
      offsetKey: props.offsetKey,
    });
  };

  React.useEffect(() => {
    if (debouncedDecoratedText && debouncedDecoratedText !== '') {
      setUrlInfo();
    } else {
      context.deleteLink(props.offsetKey);
    }
    return (): void => {
      if (!debouncedDecoratedText || debouncedDecoratedText === '') {
        context.deleteLink(props.offsetKey);
      }
    };
  }, [debouncedDecoratedText]);

  React.useEffect(() => (): void => {
    context.deleteLink(props.offsetKey);
  }, []);

  return (
    <>
      <a
        className="external-link"
        style={{
          color: '#1F7AE0'
        }}
      >
        {props.children}
      </a>
    </>
  );
};

export default withConsumer(LinkComponent);
