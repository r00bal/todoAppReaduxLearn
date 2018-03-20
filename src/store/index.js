import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import rootReducer from '../reducers';

const initialState = loadState();
const store = createStore(
  rootReducer,
  initialState
);

store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos
  })
},5000))

export default store;
