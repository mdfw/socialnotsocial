import { fetchRecipientsAPI, addRecipientAPI } from './recipientsAPI';


const RECEIVE_RECIPIENTS = 'RECEIVE_RECIPIENTS';
function receiveRecipients(recipients) {
  return {
    type: RECEIVE_RECIPIENTS,
    recipients: recipients,
  };
}

const REQUEST_RECIPIENTS = 'REQUEST_RECIPIENTS';
function requestRecipients() {
  return { type: REQUEST_RECIPIENTS };
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
    dispatch(requestRecipients());
    dispatch(fetchRecipientsAPI());
  };
}


function submitNewRecipient(displayName, email, formId) {
  return (dispatch) => {
    dispatch(addRecipientAPI(displayName, email, formId));
  };
}

export {
  RECEIVE_RECIPIENTS,
  receiveRecipients,
  REQUEST_RECIPIENTS,
  requestRecipients,
  RECEIVE_RECIPIENTS_ERROR,
  receiveRecipientsError,
  fetchRecipients,
  submitNewRecipient,
};
