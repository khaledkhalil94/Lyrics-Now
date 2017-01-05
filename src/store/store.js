import {createStore, compose, applyMiddleware} from 'redux';
import reducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger({collapsed: true});

export default function configureStore(){
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(thunk, reduxImmutableStateInvariant(), logger)
    )
  );
}