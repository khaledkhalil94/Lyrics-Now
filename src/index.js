import React from 'react';
import {render} from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import storeStock from './store/store';


const store = storeStock();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
