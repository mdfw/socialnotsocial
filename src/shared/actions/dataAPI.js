import fetch from 'isomorphic-fetch';
import { formUpdate, formClear } from './forms';

// -------- //
// FETCHING //
// -------- //
/* Fetch data from the endpoint
 * @param {string} endpoint - the name of the endpoint
 * @param {func} successDispatch - The callback for success.
 * @param {string} endpointObject - The name of the object that's attached to response that's
 *    returned in successDispatch
 * @param {func} errorDispatch - the callback for errors. Calls with an error object.
 */
const fetchDataAPI = function fetchDataAPI(
  endpoint,
  successDispatch,
  endpointObject,
  errorDispatch,
  ) {
  return function fetchDataDispatch(dispatch) {
    console.log(`Fetching data from ${endpoint}`);
    if (!endpoint) {
      throw new Error('No endpoint specified');
    }
    const url = `/api/v1/${endpoint}`;
    return fetch(url, {
      credentials: 'same-origin',
    })
    .then(function checkAPIReturn(response) {
      if (response.status === 200) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(function returnData(response) {
      return dispatch(
        successDispatch(response[endpointObject]),
      );
    })
    .catch(function receiveError(error) {
      console.log('Fetching error');
      console.dir(error);
      return dispatch(
        errorDispatch(error),
      );
    });
  };
};


// ------ //
// ADDING //
// ------ //

/* Add an item through the api.
 * @param {string} endpoint - the name of the api endpoint for this request.
 * @param {object} body - the body to send to the endpoint
 * @param {func} successDispatch - the callback on success.
 * @param {string} endpointObject - The name of the object that's attached to response that's
 *    returned in successDispatch
 * @param {string} formId - the formId to clear on success.
 * 1. Updates formId with 'submitting: true'
 * 2. Calls to the api endpoint to create an item.
 * 3. On success, clears the form[formId] and calls successDispatch
 * 4. On error, calls errorDispatch with the error.
 */
const addDataAPI = function addDataAPI(
  endpoint,
  body,
  successDispatch,
  endpointObject,
  formId,
  ) {
  return function fetchAddPostDispatch(dispatch) {
    if (!endpoint || !body || !formId || !successDispatch || !endpointObject) {
      throw new Error('Parameters incorrect.');
    }
    console.log(`Adding data to ${endpoint}`);
    dispatch(
      formUpdate(formId, {
        submitting: true,
      }),
    );
    fetch(`/api/v1/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    })
    .then(function checkAPIResponse(response) {
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
    .then(function dispatchOnSuccess(response) {
      return dispatch(
        successDispatch(response[endpointObject]),
      );
    })
    .then(function dispathFormClear() { // dispatch, formId
      return dispatch(
        formClear(formId),
      );
    })
    .then(function addSuccess() {
      return dispatch(
        successDispatch(),
      );
    })
    .catch(function submitError(error) {
      const errMsg = error.message;
      return dispatch(
        formUpdate(formId, {
          submitting: false,
          submitError: errMsg,
        }),
      );
    });
  };
};

// -------- //
// UPDATING //
// -------- //

/* Update an item.
 * @param {string} endpoint - the name of the api endpoint for this request.
 * @param {number} id - the dataId to update
 * @param {object} body - the body to send to the endpoint
 * @param {func=} successDispatch - the callback on success. Should take (id) as param.
 * @param {string} endpointObject - The name of the object that's attached to response that's
 *    returned in successDispatch
 * @param {string} formId - the formId to clear on success.
 * 1. Updates formId with 'submitting: true'
 * 2. Calls to the api endpoint to update item with id of id.
 * 3. On success, clears the form[formId] and calls successDispatch
 * 4. On error, updates form with error flag.
 */
const updateDataAPI = function updateDataAPI(
  endpoint,
  id,
  body,
  successDispatch,
  endpointObject,
  formId,
  ) {
  return function fetchUpdateDataDispatch(dispatch) {
    if (!endpoint || !id || !body || !formId || !successDispatch || !endpointObject) {
      throw new Error('Parameters incorrect');
    }
    console.log('Update running: body');
    console.dir(body);
    dispatch(formUpdate(formId, {
      submitting: true,
    }));
    fetch(`/api/v1/${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    })
    .then(function checkAPIreturn(response) {
      console.log('UpdateData response: ');
      console.dir(response);
      if (response.status === 200) {
        console.log('UpdateData got a 200 response. That is good.');
        return response;
      }
      console.log('UpdateData got a some other response. Throwing ERROR.');
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(function dispatchOnSuccess(responseData) {
      return dispatch(
        successDispatch(responseData[endpointObject]),
      );
    })
    .then(function dispathFormClear() {
      return dispatch(
        formClear(formId),
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
// DELETING //
// -------- //


/* Deletes an item from the api.
 * @param {string} endpoint - the name of the api endpoint for this request.
 * @param {number} id - the dataId to delete
 * @param {func=} successDispatch - the callback on success.
 * @param {string} formId - the formId to clear on success.
 * 1. Updates formId with 'submitting: true'
 * 2. Calls to the api endpoint to delete item with id of id.
 * 3. On success, clears the form[formId] and calls successDispatch
 * 4. On error, updates form with error flag.
 */
const deleteDataAPI = function deleteDataAPI(
  endpoint,
  id,
  successDispatch,
  formId,
  ) {
  return function fetchDeleteDataDispatch(dispatch) {
    if (!endpoint || !id || !formId) {
      throw new Error('Parameters incorrect');
    }
    dispatch(formUpdate(formId, {
      submitting: true,
    }));
    fetch(`/api/v1/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
    .then(function checkAPIreturn(response) {
      console.log('Delete response');
      console.dir(response);
      if (response.status === 204) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(function dispatchOnSuccess() {
      return dispatch(
        successDispatch(id),
      );
    })
    .then(function dispathFormClear() {
      return dispatch(
        formClear(formId),
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

export { fetchDataAPI, addDataAPI, updateDataAPI, deleteDataAPI };
