import React from 'react';
import TextField from './ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

/* SubmitProgress shows a spinner while we wait for account creation.
  */
class LoginProgress extends React.Component { // eslint-disable-line react/no-multi-comp
  render() {
    if (this.props.submitting) {
      return <CircularProgress mode="indeterminate" />;
    }
    return null;
  }
}
LoginProgress.propTypes = {
  submitting: React.PropTypes.bool,
};

const errorStyle = {
  color: '#c94f49',
  marginTop: '10px',
  marginBottom: '5px',
};

const LoginError = ({ errorMessage }) => {
  if (!errorMessage || errorMessage.length === 0) {
    return null;
  }
  return <div style={errorStyle}>{errorMessage}</div>;
};

LoginError.propTypes = {
  errorMessage: React.PropTypes.string,
};

/* button style for the submit button below */
const submitButtonStyle = {
  margin: 12,
};

/* Main login form component */
class LoginForm extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  onChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.props.handleChange({
      [name]: value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();
  }
  onBlur(e) {
    const name = e.target.name;
    this.props.handleBlur(name);
  }
  onFocus(e) {
    const name = e.target.name;
    this.props.handleFocus(name);
  }
  render() {
    const {
      loggingIn,
      errors,
      emailValue,
      passwordValue,
      passwordFieldType,
    } = this.props;

    let errorInfo = null;
    if (this.props.errors.loginError) {
      errorInfo = <LoginError errorMessage={this.props.errors.loginError} />;
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="login-text-header">
            Log in
          </div>
          {errorInfo}
          <div>
            <TextField
              name="email"
              hintText="Email"
              labelText="Email"
              value={emailValue}
              errorText={errors.email}
              type="text"
              disabled={loggingIn}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
          </div>
          <div>
            <TextField
              name="password"
              hintText=""
              value={passwordValue}
              labelText="Password"
              disabled={loggingIn}
              type={passwordFieldType}
              errorText={errors.password}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
          </div>
          <div>
            <RaisedButton
              label="Login"
              primary={true} // eslint-disable-line react/jsx-boolean-value
              style={submitButtonStyle}
              disabled={loggingIn || !errors.formReady}
              type="submit"
            />
          </div>
        </form>
        <LoginProgress loggingIn={loggingIn} />
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  handleBlur: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  loggingIn: React.PropTypes.bool,
  errors: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  emailValue: React.PropTypes.string,
  passwordValue: React.PropTypes.string,
  passwordFieldType: React.PropTypes.string,
};

export default LoginForm;
