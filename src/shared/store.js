import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { accountReducer, formReducer } from './reducers/';

const allReducers = combineReducers({
  account: accountReducer,
  routing: routerReducer,
  forms: formReducer,
});

const routerReduxMiddleware = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
  console.log('All the reducers');
  console.dir(allReducers);
  const store = createStore(allReducers, initialState, composeWithDevTools(
    applyMiddleware(thunkMiddleware, routerReduxMiddleware),
  ));
  console.log('Created store');
  console.dir(store);
  return store;
}
