import React from 'react';
import ReactDOM from 'react-dom';
import { DefaultTypelessProvider } from 'typeless';
import { App } from './app/App';

ReactDOM.render(
  <DefaultTypelessProvider>
    <App />
  </DefaultTypelessProvider>,
  document.getElementById('root'),
);
