import fetch from 'isomorphic-fetch';
import {
  receiveRecipients,
  receiveRecipientsError,
  fetchRecipients,
} from './recipients';
import { formUpdate, formClear } from './forms';

// ------- //
// HELPERS //
// ------- //

/* Check that we did not receive an error from api server
 * Returns server error.statusText on non-201 status
 * Returns the server response object on 201 status
 */
function checkAPIReturn(response) {
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
/* The main fetching api for recipients - this is exported */
const fetchRecipientsAPI = function fetchRecipientsAPI() {
  return function fetchRecipientsDispatch(dispatch) {
    const url = '/api/v1/recipients';
    return fetch(url, {
      credentials: 'same-origin',
    })
    .then(checkAPIReturn)
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(function returnRecipientsData(response) {
      return dispatch(
        receiveRecipients(response.recipients),
      );
    })
    .catch(function receiveError(error) {
      console.log('Fetching error');
      console.dir(error);
      return dispatch(
        receiveRecipientsError(error),
      );
    });
  };
};


// ------ //
// ADDING //
// ------ //


/* Clears the new account data from the store
  */
function dispatchNewRecipientFormClear(dispatch, formId) {
  return dispatch(
    formClear(formId),
  );
}
/* The heavy lifting work of adding an account.
 * @param {string} displayName
 * @param {string} email
 * Calls to the api endpoint to create an recipient, parses it,
 *   clears the form.
 */
const addRecipientAPI = function addRecipientAPI(displayName, email, formId) {
  return function fetchAddPostDispatch(dispatch) {
    // Set the submitting flag
    dispatch(formUpdate(formId, {
      submitting: true,
    }));
    fetch('/api/v1/recipients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        displayName: displayName,
        email: email,
      }),
    })
    .then(checkAPIReturn)
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(dispatchNewRecipientFormClear(dispatch, formId))
    .then(function getUpdatedRecipients() {
      return dispatch(
        fetchRecipients(),
      );
    })
    .catch(function submitError(error) {
      const errMsg = error.message;
      return dispatch(formUpdate(formId, {
        submitting: false,
        submitError: errMsg,
      }));
    });
  };
};

export { fetchRecipientsAPI, addRecipientAPI };
