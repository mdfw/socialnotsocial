import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { accountReducer, registerFormReducer } from './reducers/';

const allReducers = combineReducers({
  account: accountReducer,
  routing: routerReducer,
  registerForm: registerFormReducer,
});

export default function configureStore(initialState) {
  console.log('All the reducers');
  console.dir(allReducers);
  const store = createStore(allReducers, initialState, composeWithDevTools(
    applyMiddleware(thunkMiddleware),
  ));
  console.log('Created store');
  console.dir(store);
  return store;
}
