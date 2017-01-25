import React from 'react';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

class SubmitProgress extends React.Component {
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

class RegisterForm extends React.Component {
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
    const { submitting, errors, displayNameValue, emailValue, passswordValue, passwordFieldType } = this.props;
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
            <button type="submit" disabled={submitting || !errors.formReady}>Submit</button>
          </div>
        </form>
        <SubmitProgress submitting={submitting} />
      </div>
    );
  }
}
/*
RegisterForm.propTypes = {
  handleSubmit: React.PropTypes.func.required,
  submitting: React.PropTypes.bool,
};
*/
export default RegisterForm;
