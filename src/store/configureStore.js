import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';


import rootReducer from '../reducers';


// const thunk = (store) => (next) => (action) =>
//   typeof action === 'function' ?
//     action(store.dispatch, store.getState) :
//     next(action)

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
     middlewares.push(createLogger);
   }

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );

};

export default configureStore;
