import { createStore } from 'redux';

import rootReducer from '../reducers';


const store = createStore(
  rootReducer,
  initialState
);



export default store;
