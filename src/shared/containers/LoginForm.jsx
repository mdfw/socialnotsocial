import { connect } from 'react-redux';
import React from 'react';
import { loginAccount, loginErrorAck } from '../actions/account';
import { LOGIN_FORM_NAME, formUpdate } from '../actions/forms';
import LoginForm from '../components/LoginForm';
import { appraiseEmail,
  appraisePassword,
} from '../helpers/appraise';

function determineErrors(email, pass, touched, exited) {
  const errors = {
    email: '',
    password: '',
    formReady: true,
  };

  const emailErrors = appraiseEmail(email);
  if (emailErrors.length > 0 && exited.indexOf('email') > -1) {
    errors.email = emailErrors.join(' ');
  }
  const passwordErrors = appraisePassword(pass);
  if (passwordErrors.length > 0 && ((exited.indexOf('password') > -1) || (touched.indexOf('password') > -1 && pass.length > 5))) {
    errors.password = passwordErrors.join(' ');
  }
  if (passwordErrors.length > 0 || emailErrors.length > 0) {
    errors.formReady = false;
  }
  return errors;
}

class LoginFormContainer extends React.Component {
  handleSubmit() {
    this.props.dispatch(
      loginAccount(this.props.email, this.props.password),
    );
  }
  handleChange(fields) {
    this.props.dispatch(formUpdate(LOGIN_FORM_NAME, fields));
  }
  handleFocus(fieldName) {
    if (this.props.fieldsTouched.indexOf(fieldName) === -1) {
      const newTouched = this.props.fieldsTouched.concat(fieldName);
      this.props.dispatch(formUpdate(LOGIN_FORM_NAME, { fieldsTouched: newTouched }));
    }
  }
  handleBlur(fieldName) {
    if (this.props.fieldsExited.indexOf(fieldName) === -1) {
      const newExited = this.props.fieldsExited.concat(fieldName);
      this.props.dispatch(formUpdate(LOGIN_FORM_NAME, { fieldsExited: newExited }));
    }
  }
  handleErrorAck() {
    this.props.dispatch(loginErrorAck());
  }
  render() {
    const errors = determineErrors(
      this.props.email,
      this.props.password,
      this.props.fieldsTouched,
      this.props.fieldsExited,
    );
    if (this.props.loginError && this.props.loginError.length > 0) {
      errors.loginError = this.props.loginError;
    }
    return (
      <LoginForm
        handleSubmit={() => this.handleSubmit()}
        handleChange={fields => this.handleChange(fields)}
        handleBlur={fieldName => this.handleBlur(fieldName)}
        handleFocus={fieldName => this.handleFocus(fieldName)}
        handleErrorAck={() => this.handleErrorAck()}
        loggingIn={this.props.loggingIn}
        emailValue={this.props.email}
        passswordValue={this.props.password}
        passwordFieldType="password"
        errors={errors}
      />
    );
  }
}

LoginFormContainer.propTypes = {
  loggingIn: React.PropTypes.bool,
  loginError: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  fieldsTouched: React.PropTypes.arrayOf(React.PropTypes.string),
  fieldsExited: React.PropTypes.arrayOf(React.PropTypes.string),
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    submitting: state.account.submitting,
    submitError: state.account.submitError,
    email: state.forms.loginForm.email,
    password: state.forms.loginForm.password,
    fieldsTouched: state.forms.loginForm.fieldsTouched,
    fieldsExited: state.forms.loginForm.fieldsExited,
  };
};

const Container = connect(mapStateToProps)(LoginFormContainer);

export default Container;
