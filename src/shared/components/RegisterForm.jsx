import React from 'react';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

/* SubmitProgress shows a spinner while we wait for account creation.
  */
class SubmitProgress extends React.Component { // eslint-disable-line react/no-multi-comp
  render() {
    if (this.props.submitting) {
      return <CircularProgress mode="indeterminate" />;
    }
    return null;
  }
}
SubmitProgress.propTypes = {
  submitting: React.PropTypes.bool,
};

/* button style for the submit button below */
const submitButtonStyle = {
  margin: 12,
};

/* Main registration form component */
class RegisterForm extends React.Component { // eslint-disable-line react/no-multi-comp
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
      submitting,
      errors,
      displayNameValue,
      emailValue,
      passswordValue,
      passwordFieldType,
    } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            Create an account on Social, not social
          </div>
          <div>
            <TextField
              name="displayName"
              hintText="Your full name"
              floatingLabelText="Your Name"
              errorText={errors.displayName}
              value={displayNameValue}
              type="text"
              disabled={submitting}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
          </div>
          <div>
            <TextField
              name="email"
              hintText="Email"
              floatingLabelText="Email"
              value={emailValue}
              errorText={errors.email}
              type="text"
              disabled={submitting}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
          </div>
          <div>
            <TextField
              name="password"
              hintText=""
              value={passswordValue}
              floatingLabelText="Password"
              type={passwordFieldType}
              errorText={errors.password}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
          </div>
          <div>
            <RaisedButton
              label="Create account"
              primary={true} // eslint-disable-line react/jsx-boolean-value
              style={submitButtonStyle}
              disabled={submitting || !errors.formReady}
              type="submit"
            />
          </div>
        </form>
        <SubmitProgress submitting={submitting} />
      </div>
    );
  }
}

RegisterForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  handleBlur: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool,
  errors: React.PropTypes.object,
  displayNameValue: React.PropTypes.string,
  emailValue: React.PropTypes.string,
  passswordValue: React.PropTypes.string,
  passwordFieldType: React.PropTypes.string,
};

export default RegisterForm;