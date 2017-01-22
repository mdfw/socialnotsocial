import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
const reducers = require('./reducers/');

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(reducers, initialState);
    return store;
}

/*
  AccountReducer
  PostsReducer
  CurrentPostReducer
  */
  