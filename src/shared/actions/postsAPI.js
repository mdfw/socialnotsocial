import fetch from 'isomorphic-fetch';
import {
  receivePosts,
  receivePostsError,
  fetchPosts,
} from './posts';
import { formUpdate, formClear, CREATE_POST_FORM_NAME } from './forms';

// ------- //
// HELPERS //
// ------- //

/* Check that we did not receive an error from api server
 * Returns server error.statusText on non-201 status
 * Returns the server response object on 201 status
 */
function checkAPIReturn(response) {
  console.log('PostsAPI:checkAPIReturn');
  console.dir(response);
  if (response.status === 201 || response.status === 200) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


// -------- //
// FETCHING //
// -------- //
/* The main fetching api for posts - this is exported */
const fetchPostsAPI = function fetchPostsAPI() {
  console.log('Fetching posts');
  return function fetchPostsDispatch(dispatch) {
    const url = '/api/v1/posts';
    return fetch(url, {
      credentials: 'same-origin',
    })
    .then(checkAPIReturn)
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(function returnPostsData(response) {
      console.log('returnPostsData');
      console.dir(response);
      return dispatch(
        receivePosts(response.posts),
      );
    })
    .catch(function receiveError(error) {
      console.log('Fetching error');
      console.dir(error);
      return dispatch(
        receivePostsError(error),
      );
    });
  };
};


// ------ //
// ADDING //
// ------ //


/* Clears the new account data from the store
  */
function dispatchNewPostFormClear(dispatch) {
  return dispatch(
    formClear(CREATE_POST_FORM_NAME),
  );
}
/* The heavy lifting work of adding a post.
 * @param {string} message
 * Calls to the api endpoint to create a post. If successful, clears form,
 *   and calls the fetch.
 * TODO: probably better to just insert into the posts array instead of calling back.
 */
const addPostAPI = function addPostAPI(message) {
  return function fetchAddPostDispatch(dispatch) {
    if (!message || message.length === 0) {
      throw new Error('Missing message for post.');
    }
    // Set the submitting flag
    dispatch(formUpdate(CREATE_POST_FORM_NAME, {
      submitting: true,
    }));
    fetch('/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        message: message,
      }),
    })
    .then(checkAPIReturn)
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(dispatchNewPostFormClear(dispatch))
    .then(function getUpdatedPosts() {
      return dispatch(
        fetchPosts(),
      );
    })
    .catch(function submitError(error) {
      const errMsg = error.message;
      return dispatch(formUpdate(CREATE_POST_FORM_NAME, {
        submitting: false,
        submitError: errMsg,
      }));
    });
  };
};

export { fetchPostsAPI, addPostAPI };
