import { combineReducers } from 'redux';

import accountReducer from './account';
import postsReducer from './posts';
import editPostReducer from './editPost';

const rootReducer = combineReducers({
  account: accountReducer,
  posts: postsReducer,
  editPost: editPostReducer,
});

export default rootReducer;
