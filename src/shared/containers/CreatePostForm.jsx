import { connect } from 'react-redux';
import React from 'react';
import { submitNewPost, submitPostErrorAck } from '../actions/posts';
import { CREATE_POST_FORM_NAME, formUpdate } from '../actions/forms';
import CreatePostForm from '../components/CreatePostForm';
import { appraisePostMessage,
  appraisePostSubject,
} from '../helpers/appraise';

function determineErrors(message, subject, touched, exited) {
  const errors = {
    message: '',
    subject: '',
    formReady: true,
  };

  const messageErrors = appraisePostMessage(message);
  if (messageErrors.length > 0 && exited.indexOf('message') > -1) {
    errors.message = messageErrors.join(' ');
  }
  const subjectErrors = appraisePostSubject(subject);
  if (subjectErrors.length > 0 && exited.indexOf('subject') > -1) {
    errors.subject = subjectErrors.join(' ');
  }
  if (messageErrors.length > 0 || subjectErrors.length > 0) {
    errors.formReady = false;
  }
  return errors;
}

class CreatPostContainer extends React.Component {
  handleSubmit() {
    this.props.dispatch(
      submitNewPost(this.props.message, this.props.subject),
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
  handleErrorAck() {
    this.props.dispatch(submitPostErrorAck());
  }
  render() {
    const errors = determineErrors(
      this.props.message,
      this.props.subject,
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
        handleErrorAck={() => this.handleErrorAck()}
        submitting={this.props.submitting}
        subjectValue={this.props.subject}
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
  subject: React.PropTypes.string,
  message: React.PropTypes.string,
  fieldsTouched: React.PropTypes.arrayOf(React.PropTypes.string),
  fieldsExited: React.PropTypes.arrayOf(React.PropTypes.string),
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    submitting: state.forms.createPostForm.submitting,
    submitError: state.forms.createPostForm.submitError,
    subject: state.forms.createPostForm.subject,
    message: state.forms.createPostForm.message,
    fieldsTouched: state.forms.loginForm.fieldsTouched,
    fieldsExited: state.forms.loginForm.fieldsExited,
  };
};

const Container = connect(mapStateToProps)(CreatPostContainer);

export default Container;
