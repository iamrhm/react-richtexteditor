import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './context/Provider';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));
serviceWorker.unregister();
