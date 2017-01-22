

const DEFAULT_EDITPOST_STATE = {
  message: '',
  subject: '',
  postStatus: 'draft',
  dateCreated: null,
  postId: null,
};

const editPostReducer = function editPostReducer(state = DEFAULT_EDITPOST_STATE, action) {
  let newstate = state;
  switch (action.type) {
    case EDIT_POST: {
      newstate = {
        ...state,
        message: action.message,
        subject: action.subject,
      };
      break;
    }
    case EDIT_POST_META: {
      newstate = {
        ...state,
        postStatus: action.postStatus,
        dateCreated: action.dateCreated,
        postId: action.postId,
      };
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default editPostReducer;
