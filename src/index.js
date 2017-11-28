import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';
import * as record from './record';

function renderToDOM() {
  return ReactDOM.render(
    <Provider {...{ store }}>
      <App {...{ record }} />
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(() => {
  const state = store.getState();

  if (state.currentState === 1) {
    record.save(state);
  }

  if (state.currentState === 2) {
    record.save(state);
    record.finish();
  }
});
renderToDOM();
