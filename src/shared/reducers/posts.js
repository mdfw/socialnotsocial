import {
  REQUEST_POSTS,
  RECEIVE_POSTS_ERROR,
  RECEIVE_POSTS,
} from '../actions/posts';

const DEFAULT_POSTS_STATE = {
  posts: [],
  fetching: false,
  fetchError: null,
};

const postsReducer = function postsReducer(state = DEFAULT_POSTS_STATE, action) {
  let newstate = state;
  switch (action.type) {
    case RECEIVE_POSTS: {
      newstate = {
        ...state,
        posts: action.posts,
        fetching: false,
        submitting: false,
      };
      break;
    }
    case REQUEST_POSTS: {
      newstate = {
        ...state,
        fetching: true,
      };
      break;
    }
    case RECEIVE_POSTS_ERROR: {
      newstate = {
        ...state,
        fetching: false,
        fetchError: action.errorMessage,
      };
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default postsReducer;
