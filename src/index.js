import React from 'react';
import 'closest-polyfill';
import {render} from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import storeStock from './store/store';
import './css/main.css';
import './css/mq.css';

const store = storeStock();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
