import React, { Component } from 'react';
import { TextField, TextSize } from './ui/TextField';
import { SNSButton, ButtonSize, ButtonStyle } from './ui/SNSButton';

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
  onCanRespondChange() {
    const newCanRespond = !this.props.canRespondValue;
    this.props.handleChange({
      canRespond: newCanRespond,
    });
  }
  render() {
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
        <div className="edit-recipient-cancel-button">
          <SNSButton
            buttonStyle={ButtonStyle.SECONDARY}
            buttonSize={ButtonSize.SMALL}
            label="Cancel"
            onClick={this.props.handleCancel}
          />
        </div>
      );
    }
    return (
      <div className="edit-recipient-form">
        <div className="edit-recipient-form-title">
          {this.props.formTitle}
        </div>
        {errorDialog}
        <form onSubmit={this.onSubmit}>
          <div className="edit-recipient-form-displayName-field">
            <TextField
              name="displayName"
              hintText="Recipient's full name"
              labelText="Name"
              errorText={errors.displayName}
              value={displayNameValue}
              type="text"
              disabled={submitting}
              required={true}
              textSize={TextSize.MEDIUM}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
          </div>
          <div className="edit-recipient-form-email-field">
            <TextField
              name="email"
              hintText="Recipient's Email"
              labelText="Email"
              value={emailValue}
              errorText={errors.email}
              type="text"
              disabled={submitting}
              required={true}
              textSize={TextSize.MEDIUM}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
          </div>
          <div className="edit-recipient-form-canRespond-field">
            <label htmlFor={`canRespond${this.props.formId}`}>
              <input
                id={`canRespond${this.props.formId}`}
                type="checkbox"
                name="canRespond"
                checked={canRespondValue}
                onChange={this.onCanRespondChange}
                style={{ marginRight: '5px' }}
              />
              Allow recipient to respond.
            </label>
          </div>
          <div className="edit-recipient-controls">
            <div className="edit-recipient-submit-button">
              <SNSButton
                label="Submit"
                buttonStyle={ButtonStyle.PRIMARY}
                buttonSize={ButtonSize.SMALL}
                disabled={this.props.submitting || !errors.formReady}
                showSpinner={this.props.submitting}
                type="submit"
                onClick={this.onSubmit}
              />
            </div>
            {cancelButton}
          </div>
        </form>
      </div>
    );
  }
}

RecipientEditForm.propTypes = {
  formTitle: React.PropTypes.string.isRequired,
  formId: React.PropTypes.string.isRequired,
  displayNameValue: React.PropTypes.string,
  emailValue: React.PropTypes.string,
  submitting: React.PropTypes.bool,
  errors: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  canRespondValue: React.PropTypes.bool.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleBlur: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleCancel: React.PropTypes.func,
};

export default RecipientEditForm;
