import React from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

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

/* Shows account creation errors.
  */
class LoginErrorDisplay extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.handleErrorAck();
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Try again"
        primary={true} // eslint-disable-line react/jsx-boolean-value
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Error"
          actions={actions}
          modal={false} // eslint-disable-line react/jsx-boolean-value
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.errorMessage}
        </Dialog>
      </div>
    );
  }
}
LoginErrorDisplay.propTypes = {
  handleErrorAck: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string.isRequired,
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
      passswordValue,
      passwordFieldType,
    } = this.props;
    let errorDialog = null;
    if (this.props.errors.loginError) {
      errorDialog = (
        <LoginErrorDisplay
          errorMessage={this.props.errors.loginError}
          handleErrorAck={this.props.handleErrorAck}
        />
      );
    }
    return (
      <div>
        {errorDialog}
        <form onSubmit={this.onSubmit}>
          <div>
            Log in to Social, not social
          </div>
          <div>
            <TextField
              name="email"
              hintText="Email"
              floatingLabelText="Email"
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
              value={passswordValue}
              floatingLabelText="Password"
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
  handleErrorAck: React.PropTypes.func.isRequired,
  loggingIn: React.PropTypes.bool,
  errors: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  emailValue: React.PropTypes.string,
  passswordValue: React.PropTypes.string,
  passwordFieldType: React.PropTypes.string,
};

export default LoginForm;
