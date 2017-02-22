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
/* The main fetching api for recipients */
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

/* Add a recipient through the api.
 * @param {string} displayName - the name of the recipient
 * @param {string} email - the email of the recipient
 * @param {string} formId - the formId to clear on success.
 * Calls to the api endpoint to create a recipient, parses it,
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
    .then(function checkAPIResponse(response){
      if (response.status === 201) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(dispathFormClear(dispatch, formId){
       return dispatch(
        formClear(formId),
      );
    })
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

// -------- //
// UPDATING //
// -------- //

/* Update a recipient.
 * @param {number} id - the recipientID to update
 * @param {string} displayName
 * @param {string} email
 * @param {string} formId - the formId to clear on success.
 * Calls to the api endpoint to update a recipient, parses it,
 *   clears the form.
 */
const updateRecipientAPI = function updateRecipientAPI(id, displayName, email, formId) {
  return function fetchUpdatePostDispatch(dispatch) {
    // Set the submitting flag
    dispatch(formUpdate(formId, {
      submitting: true,
    }));
    fetch(`/api/v1/recipients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        displayName: displayName,
        email: email,
      }),
    })
    .then(function checkAPIreturn(response) {
      if (response.status === 204) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;

    })
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(dispathFormClear(dispatch, formId){
      return dispatch(
        formClear(formId),
      );
    })
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
export { fetchRecipientsAPI, addRecipientAPI, updateRecipientAPI };
