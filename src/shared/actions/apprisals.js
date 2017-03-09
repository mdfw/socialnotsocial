import { fetchDataAPI, addDataAPI, addDataAPI2, updateDataAPI, deleteDataAPI } from './dataAPI';
import { fetchAPost } from './posts';
import { formUpdate, formClear } from './forms';

const RECEIVE_APPRISALS = 'RECEIVE_APPRISALS';
function receiveApprisals(apprisals) {
  return {
    type: RECEIVE_APPRISALS,
    apprisals: apprisals,
  };
}

const REQUESTING_APPRISALS = 'REQUESTING_APPRISALS';
function requestingApprisals() {
  return { type: REQUESTING_APPRISALS };
}

const RECEIVE_APPRISALS_ERROR = 'RECEIVE_APPRISALS_ERROR';
function receiveApprisalsError(errorMessage) {
  return {
    type: RECEIVE_APPRISALS_ERROR,
    errorMessage: errorMessage,
  };
}

function fetchApprisals() {
  return (dispatch) => {
    dispatch(
      requestingApprisals(),
    );
    dispatch(
      fetchDataAPI(
        'apprisals',
        receiveApprisals,
        'apprisals',
        receiveApprisalsError,
      ),
    );
  };
}

function newApprisal(body, postId, formId) {
  return (dispatch) => {
    dispatch(
      addDataAPI2(
        'apprisals',
        body,
      )
      .then(() => {
        console.log(`clear formId ${formId}`);
        dispatch(
          formClear(formId),
        );
      })
      .then(() => {
        console.log(`fetching a post ${formId}`);
        dispatch(
          fetchAPost(postId),
        );
      })
      .catch(function submitError(error) {
        const errMsg = error.message;
        console.log(`Error caught ${errMsg}`);
        return dispatch(
          formUpdate(formId, {
            submitting: false,
            submitError: errMsg,
          }),
        );
      }),
    );
  };
}

function updateApprisal(apprisalId, body, postId, formId) {
  return (dispatch) => {
    dispatch(
      updateDataAPI(
        'apprisals',
        apprisalId,
        body,
        fetchAPost(postId),
        'apprisal',
        formId,
      ),
    );
  };
}

function deleteApprisal(apprisalId, postId, formId) {
  return (dispatch) => {
    dispatch(
      deleteDataAPI(
        'apprisals',
        apprisalId,
        fetchAPost(postId),
        formId,
      ),
    );
  };
}

export {
  RECEIVE_APPRISALS,
  receiveApprisals,
  REQUESTING_APPRISALS,
  requestingApprisals,
  RECEIVE_APPRISALS_ERROR,
  receiveApprisalsError,
  fetchApprisals,
  newApprisal,
  updateApprisal,
  deleteApprisal,
};
