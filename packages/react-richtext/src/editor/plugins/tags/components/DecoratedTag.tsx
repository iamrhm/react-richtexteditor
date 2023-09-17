/* eslint-disable react-refresh/only-export-components */
import React from 'react';

import withConsumer from '../../../context/withConsumer';

function DecoratedTaggedComponent(
  props: { children: React.ReactNode },
): JSX.Element {
  const { children } = props;

  return (
    <>
      <a className="tagged-element" style={{
        color: '#1F7AE0',
        cursor: 'pointer',
      }}>
        {children}
      </a>
    </>
  );
}

export default withConsumer(DecoratedTaggedComponent);
