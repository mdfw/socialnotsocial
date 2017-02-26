import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from './ui/TextField';
import ToggleSwitch from './ui/ToggleSwitch';
import CircleProgress from './ui/CircleProgress';
import SNSButton from './ui/SNSButton';

class RecipientEditForm extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onCanRespondChange = this.onCanRespondChange.bind(this);
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
    this.setState({ fieldActive: false });
    this.props.handleBlur(name);
  }
  onFocus(e) {
    const name = e.target.name;
    this.setState({ fieldActive: true });
    this.props.handleFocus(name);
  }
  onCanRespondChange(e, isInputChecked) {
    this.props.handleChange({
      canRespond: isInputChecked,
    });
  }
  render() {
    console.log('Edit recipient form props');
    console.dir(this.props);
    const {
      submitting,
      errors,
      displayNameValue,
      emailValue,
      canRespondValue,
    } = this.props;
    let errorDialog = null;
    if (this.props.errors.submitError) {
      errorDialog = (
        <div className="post-submit-error">
          {this.props.errors.submitError}
        </div>
      );
    }
    let cancelButton = null;
    if (this.props.handleCancel) {
      cancelButton = (
        <div>
          <SNSButton
            primary={false}
            label="Cancel"
            onClick={this.props.handleCancel}
          />
        </div>
      );
    }
    return (
      <div>
        {errorDialog}
        <form onSubmit={this.onSubmit}>
          <div>
            <TextField
              name="displayName"
              hintText="Recipient's full name"
              labelText="Name"
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
              hintText="Recipient's Email"
              labelText="Email"
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
            <ToggleSwitch
              label="Allow recipient to respond."
              on={canRespondValue}
              onToggle={this.onCanRespondChange}
              onChange={this.onChange}
            />
          </div>
          <div>
            <RaisedButton
              label="Submit"
              primary={true} // eslint-disable-line react/jsx-boolean-value
              disabled={this.props.submitting || !errors.formReady}
              type="submit"
            />
          </div>
          {cancelButton}
        </form>
        <CircleProgress running={submitting} />
      </div>
    );
  }
}

RecipientEditForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  handleBlur: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleCancel: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  errors: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  displayNameValue: React.PropTypes.string,
  emailValue: React.PropTypes.string,
  canRespondValue: React.PropTypes.bool.isRequired,
};

export default RecipientEditForm;
