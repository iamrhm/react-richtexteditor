import React from 'react';

import { EditorContext } from './Provider';

const withConsumer = (Component) => {
  return function WrapperComponent(props) {
    return (
        <EditorContext.Consumer>
            {context => <Component {...props} context={context} />}
        </EditorContext.Consumer>
    );
  };
}

export default withConsumer;