import { fetchDataAPI, addDataAPI, updateDataAPI, deleteDataAPI } from './dataAPI';
import { CREATE_POST_FORM_NAME } from './forms';


const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts,
  };
}

const REQUESTING_POSTS = 'REQUESTING_POSTS';
function requestingPosts() {
  return { type: REQUESTING_POSTS };
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
    dispatch(requestingPosts());
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

function fetchAPost(postId) {
  return (dispatch) => {
    dispatch(requestingPosts());
    dispatch(
      fetchDataAPI(
        `posts/${postId}`,
        receivePosts,
        'posts',
        receivePostsError,
        ),
    );
  };
}

function newPost(message) {
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

function updatePost(postId, message, formId) {
  return (dispatch) => {
    dispatch(
      updateDataAPI(
        'posts',
        postId,
        { message: message },
        fetchPosts,
        'post',
        formId,
      ),
    );
  };
}

function deletePost(postId, formId) {
  return (dispatch) => {
    dispatch(
      deleteDataAPI(
        'posts',
        postId,
        fetchPosts,
        formId,
      ),
    );
  };
}


export {
  RECEIVE_POSTS,
  receivePosts,
  REQUESTING_POSTS,
  requestingPosts,
  RECEIVE_POSTS_ERROR,
  receivePostsError,
  fetchPosts,
  fetchAPost,
  newPost,
  updatePost,
  deletePost,
};
