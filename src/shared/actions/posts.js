import { fetchPostsAPI, addPostAPI } from './postsAPI';


const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts,
  };
}

const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts() {
  return { type: REQUEST_POSTS };
}

const RECEIVE_POSTS_ERROR = 'RECEIVE_POSTS_ERROR';
function receivePostsError(errorMessage) {
  return {
    type: RECEIVE_POSTS_ERROR,
    errorMessage: errorMessage,
  };
}

function fetchPosts() {
  return (dispatch) => {
    dispatch(requestPosts());
    dispatch(fetchPostsAPI());
  };
}


function submitNewPost(message, subject) {
  return (dispatch) => {
    dispatch(addPostAPI(message, subject));
  };
}

export {
  RECEIVE_POSTS,
  receivePosts,
  REQUEST_POSTS,
  requestPosts,
  RECEIVE_POSTS_ERROR,
  receivePostsError,
  fetchPosts,
  submitNewPost,
};
