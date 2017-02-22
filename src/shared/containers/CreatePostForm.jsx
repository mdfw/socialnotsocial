import { connect } from 'react-redux';
import React from 'react';
import { newPost } from '../actions/posts';
import { CREATE_POST_FORM_NAME, formUpdate } from '../actions/forms';
import CreatePostForm from '../components/CreatePostForm';
import { appraisePostMessage } from '../helpers/appraise';

function determineErrors(message, touched, exited) {
  const errors = {
    message: '',
    formReady: true,
  };

  const messageErrors = appraisePostMessage(message);
  if (messageErrors.length > 0 && exited.indexOf('message') > -1) {
    errors.message = messageErrors.join(' ');
  }
  if (messageErrors.length > 0) {
    errors.formReady = false;
  }
  return errors;
}

class CreatPostContainer extends React.Component {
  handleSubmit() {
    this.props.dispatch(
      newPost(this.props.message),
    );
  }
  handleChange(fields) {
    this.props.dispatch(formUpdate(CREATE_POST_FORM_NAME, fields));
  }
  handleFocus(fieldName) {
    if (this.props.fieldsTouched.indexOf(fieldName) === -1) {
      const newTouched = this.props.fieldsTouched.concat(fieldName);
      this.props.dispatch(formUpdate(CREATE_POST_FORM_NAME, { fieldsTouched: newTouched }));
    }
  }
  handleBlur(fieldName) {
    if (this.props.fieldsExited.indexOf(fieldName) === -1) {
      const newExited = this.props.fieldsExited.concat(fieldName);
      this.props.dispatch(formUpdate(CREATE_POST_FORM_NAME, { fieldsExited: newExited }));
    }
  }
  render() {
    const errors = determineErrors(
      this.props.message,
      this.props.fieldsTouched,
      this.props.fieldsExited,
    );
    if (this.props.submitError && this.props.submitError.length > 0) {
      errors.submitError = this.props.submitError;
    }
    return (
      <CreatePostForm
        handleSubmit={() => this.handleSubmit()}
        handleChange={fields => this.handleChange(fields)}
        handleBlur={fieldName => this.handleBlur(fieldName)}
        handleFocus={fieldName => this.handleFocus(fieldName)}
        submitting={this.props.submitting}
        messageValue={this.props.message}
        errors={errors}
      />
    );
  }
}

CreatPostContainer.propTypes = {
  submitting: React.PropTypes.bool,
  submitError: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  message: React.PropTypes.string,
  fieldsTouched: React.PropTypes.arrayOf(React.PropTypes.string),
  fieldsExited: React.PropTypes.arrayOf(React.PropTypes.string),
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    submitting: state.forms.createPostForm.submitting,
    submitError: state.forms.createPostForm.submitError,
    message: state.forms.createPostForm.message,
    fieldsTouched: state.forms.loginForm.fieldsTouched,
    fieldsExited: state.forms.loginForm.fieldsExited,
  };
};

const Container = connect(mapStateToProps)(CreatPostContainer);

export default Container;
