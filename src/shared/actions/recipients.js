import { fetchDataAPI, addDataAPI, updateDataAPI, deleteDataAPI } from './dataAPI';


const RECEIVE_RECIPIENTS = 'RECEIVE_RECIPIENTS';
function receiveRecipients(recipients) {
  return {
    type: RECEIVE_RECIPIENTS,
    recipients: recipients,
  };
}

const REQUESTING_RECIPIENTS = 'REQUESTING_RECIPIENTS';
function requestingRecipients() {
  return { type: REQUESTING_RECIPIENTS };
}

const RECEIVE_RECIPIENTS_ERROR = 'RECEIVE_RECIPIENTS_ERROR';
function receiveRecipientsError(errorMessage) {
  return {
    type: RECEIVE_RECIPIENTS_ERROR,
    errorMessage: errorMessage,
  };
}

function fetchRecipients() {
  return (dispatch) => {
    dispatch(
      requestingRecipients(),
    );
    dispatch(
      fetchDataAPI(
        'recipients',
        receiveRecipients,
        'recipients',
        receiveRecipientsError,
      ),
    );
  };
}

function submitNewRecipient(displayName, email, formId) {
  return (dispatch) => {
    dispatch(
      addDataAPI(
        'recipients',
        { displayName: displayName, email: email },
        fetchRecipients,
        'recipient', 
        formId,
      ),
    );
  };
}

export {
  RECEIVE_RECIPIENTS,
  receiveRecipients,
  REQUESTING_RECIPIENTS,
  requestingRecipients,
  RECEIVE_RECIPIENTS_ERROR,
  receiveRecipientsError,
  fetchRecipients,
  submitNewRecipient,
};
