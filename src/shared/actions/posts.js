// import { fetchPostsAPI, addPostAPI } from './postsAPI';
// import { addPostAPI } from './postsAPI';
import { fetchDataAPI, addDataAPI } from './dataAPI';
import { CREATE_POST_FORM_NAME } from './forms';


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
    dispatch(
      fetchDataAPI(
        'posts',
        receivePosts,
        'posts',
        receivePostsError,
        ),
    );
  };
}


function submitNewPost(message) {
  return (dispatch) => {
    dispatch(
      addDataAPI(
        'posts',
        { message: message },
        fetchPosts,
        'post',
        CREATE_POST_FORM_NAME,
      ),
    );
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
