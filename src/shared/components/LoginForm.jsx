import React from 'react';
import { SNSButton } from './ui/SNSButton';
import { TextField } from './ui/TextField';

const errorStyle = {
  color: '#c94f49',
  marginTop: '10px',
  marginBottom: '5px',
  fontSize: '14px',
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
            <SNSButton
              label="Login"
              disabled={loggingIn || !errors.formReady}
              showSpinner={loggingIn}
              type="submit"
              onClick={this.onSubmit}
            />
          </div>
        </form>
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
