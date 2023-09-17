import React from 'react';

import { EditorContext } from './Provider';

const withConsumer = <P extends object>(Component: React.ComponentType<P>) => function WrapperComponent(props: P): JSX.Element {
  return (
    <EditorContext.Consumer>
      {(context): JSX.Element => <Component {...props} context={context} />}
    </EditorContext.Consumer>
  );
};

export default withConsumer;
