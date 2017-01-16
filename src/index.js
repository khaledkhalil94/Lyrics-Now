import React from 'react';
import {render} from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import storeStock from './store/store';

const store = storeStock();

const path = window.location.pathname
if(path !== '/'){
  if((path.substr(1, 3) === 'dev')) localStorage.setItem('enable_devtools', 'true')
  else localStorage.setItem('user', path.split('/')[1])
  window.location.replace('/')
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
