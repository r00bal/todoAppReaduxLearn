import { createStore } from 'redux';
import rootReducer from '../reducers';

const addLoggingToDispatch = (store) => {
  const next = store.dispatch;
  if (!console.group) {
  return next
}
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action','color: blue', action);
    const returnValue = next(action);
    console.log('%c next state','color: green', store.getState());
    console.groupEnd(action.type);
    console.log(next);
    return returnValue;
  }
}

const addPromiseSupportToDispatch = (store) => {
  const next = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(next);
    }

    return next(action);
  }
};

const configureStore = () => {
  const store = createStore(rootReducer);

  if (process.env.NODE_ENV !== 'production') {
     store.dispatch = addLoggingToDispatch(store);
   }

  store.dispatch = addPromiseSupportToDispatch(store);

  console.log(store.dispatch);
  return store;
}

export default configureStore;
