import {createStore, compose, applyMiddleware} from 'redux';
import reducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

const DEV_MODE = localStorage.getItem('enable_devtools') === 'true' || window.location.pathname === '/dev'

export default function configureStore(){
  const middleWares = [thunk, reduxImmutableStateInvariant()]

  if(DEV_MODE) middleWares.push(logger)
  const composeEnhancers = DEV_MODE ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose

  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(...middleWares)
    )
  );
}