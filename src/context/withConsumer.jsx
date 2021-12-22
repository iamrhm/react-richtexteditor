import React from 'react';

import { EditorContext } from './Provider';

const withConsumer = (Component) => {
  return function WrapperComponent(props) {
    return (
        <EditorContext.Consumer>
            {state => <Component {...props} context={state} />}
        </EditorContext.Consumer>
    );
  };
}

export default withConsumer;