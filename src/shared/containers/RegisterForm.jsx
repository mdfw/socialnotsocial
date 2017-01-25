import { connect } from 'react-redux';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { submitNewAccount, submitAccountErrorAck } from '../actions/account';
import { formUpdate, REG_FORM_NAME } from '../actions/forms';
import RegisterForm from '../components/RegisterForm';
import { appraiseEmail,
  appraiseDisplayName,
  appraisePassword,
} from '../helpers/appraise';

function determineErrors(dname, email, pass, touched, exited) {
  const errors = {
    displayName: '',
    email: '',
    password: '',
    formReady: true,
  };
  const displayNameErrors = appraiseDisplayName(dname);
  if (displayNameErrors.length > 0 && exited.indexOf('displayName') > -1) {
    errors.displayName = displayNameErrors.join(' ');
  }
  const emailErrors = appraiseEmail(email);
  if (emailErrors.length > 0 && exited.indexOf('email') > -1) {
    errors.email = emailErrors.join(' ');
  }
  const passwordErrors = appraisePassword(pass);
  if (passwordErrors.length > 0 && ((exited.indexOf('password') > -1) || (touched.indexOf('password') > -1 && pass.length > 5))) {
    errors.password = passwordErrors.join(' ');
  }
  if (passwordErrors.length > 0 || emailErrors.length > 0 || displayNameErrors.length > 0) {
    errors.formReady = false;
  }
  return errors;
}

class RegisterFormContainer extends React.Component {
  handleSubmit() {
    this.props.dispatch(
      submitNewAccount(this.props.displayName, this.props.email, this.props.password),
    );
  }
  handleChange(fields) {
    this.props.dispatch(formUpdate(REG_FORM_NAME, fields));
  }
  handleFocus(fieldName) {
    if (this.props.fieldsTouched.indexOf(fieldName) === -1) {
      const newTouched = this.props.fieldsTouched.concat(fieldName);
      this.props.dispatch(formUpdate(REG_FORM_NAME, { fieldsTouched: newTouched }));
    }
  }
  handleBlur(fieldName) {
    if (this.props.fieldsExited.indexOf(fieldName) === -1) {
      const newExited = this.props.fieldsExited.concat(fieldName);
      this.props.dispatch(formUpdate(REG_FORM_NAME, { fieldsExited: newExited }));
    }
  }
  handleErrorAck() {
    this.props.dispatch(submitAccountErrorAck());
  }
  render() {
    const errors = determineErrors(
      this.props.displayName,
      this.props.email,
      this.props.password,
      this.props.fieldsTouched,
      this.props.fieldsExited,
    );
    if (this.props.submitError && this.props.submitError.length > 0) {
      errors.submitError = this.props.submitError;
    }
    return (
      <MuiThemeProvider>
        <RegisterForm
          handleSubmit={() => this.handleSubmit()}
          handleChange={fields => this.handleChange(fields)}
          handleBlur={fieldName => this.handleBlur(fieldName)}
          handleFocus={fieldName => this.handleFocus(fieldName)}
          handleErrorAck={() => this.handleErrorAck()}
          submitting={this.props.submitting}
          displayNameValue={this.props.displayName}
          emailValue={this.props.email}
          passswordValue={this.props.password}
          passwordFieldType="password"
          errors={errors}
        />
      </MuiThemeProvider>
    );
  }
}

RegisterFormContainer.propTypes = {
  submitting: React.PropTypes.bool,
  submitError: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  displayName: React.PropTypes.string,
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
    displayName: state.forms.registerForm.displayName,
    email: state.forms.registerForm.email,
    password: state.forms.registerForm.password,
    fieldsTouched: state.forms.registerForm.fieldsTouched,
    fieldsExited: state.forms.registerForm.fieldsExited,
  };
};

const Container = connect(mapStateToProps)(RegisterFormContainer);

export default Container;
