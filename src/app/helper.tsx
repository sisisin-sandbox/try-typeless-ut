import React from 'react';
import { Registry, TypelessContext } from 'typeless';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

export function render(registry: Registry, factory: React.FC, container = document.createElement('div')) {
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(
      <TypelessContext.Provider value={{ registry }}>{React.createElement(factory)}</TypelessContext.Provider>,
      container,
    );
  });
}
