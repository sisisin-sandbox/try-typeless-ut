import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { DefaultTypelessProvider } from 'typeless';

ReactDOM.render(
  <DefaultTypelessProvider>
    <App />
  </DefaultTypelessProvider>,
  document.getElementById('root'),
);
