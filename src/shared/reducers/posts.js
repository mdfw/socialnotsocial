import {
  REQUEST_POSTS,
  RECEIVE_POSTS_ERROR,
  RECEIVE_POSTS,
} from '../actions/posts';
import {
  CLEAR_ACCOUNT_INFO,
} from '../actions/account';

const addOrUpdatePosts = function addOrUpdatePosts(posts, newPosts) {
  if (!newPosts || newPosts.length === 0) {
    return posts;
  }
  const currentPosts = posts;
  newPosts.forEach(function allPosts(newPost) {
    const foundPostIndex = currentPosts.findIndex(function findingAPost(existingPost) {
      return existingPost.id === newPost.id;
    });
    if (foundPostIndex === -1) {
      currentPosts.push(newPost);
    } else {
      currentPosts[foundPostIndex] = newPost;
    }
  });
  return currentPosts;
};

const DEFAULT_POSTS_STATE = () => (
  {
    posts: [],
    fetching: false,
    fetchError: null,
  }
);

const postsReducer = function postsReducer(state = DEFAULT_POSTS_STATE(), action) {
  let newstate = state;
  switch (action.type) {
    case RECEIVE_POSTS: {
      let newPosts = state.posts.slice();
      newPosts = addOrUpdatePosts(newPosts, action.posts);
      newstate = {
        ...state,
        posts: newPosts,
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
    case CLEAR_ACCOUNT_INFO: {
      newstate = DEFAULT_POSTS_STATE();
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default postsReducer;
