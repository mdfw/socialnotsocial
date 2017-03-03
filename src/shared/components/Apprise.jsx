import React from 'react';
import moment from 'moment';
import { SNSButton, ButtonSize } from './ui/SNSButton';

function recipientInfo(recipientId, recipients) {
  if (!recipientId || !recipients) {
    return '';
  }
  const foundR = recipients.find(function findId(recipient) {
    if (recipientId === recipient.id) {
      return true;
    }
    return false;
  });
  if (foundR) {
    return foundR;
  }
  return '';
}

function recipientApprised(recipient, apprisals) {
  let lastApprisedDate = new Date(2015, 11, 17);
  const apprisalsForRecipient = [];
  apprisals.forEach(function findRecipient(apprisal) {
    if (apprisal.recipient_id === recipient.id) {
      apprisalsForRecipient.push(apprisal);
      if (apprisal.created_at > lastApprisedDate) {
        lastApprisedDate = apprisal.created_at;
      }
    }
  });
  if (apprisalsForRecipient.length > 0) {
    return ({
      apprisals: apprisalsForRecipient,
      lastApprised: lastApprisedDate,
    });
  }
  return null;
}

class RecipientCheckbox extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }
  onChange() {
    this.props.onChange(this.props.recipientId);
  }
  render() {
    const checked = this.props.checked;
    const name = this.props.recipientName;
    const id = this.props.recipientId;
    const formId = this.props.formId;
    let via = null;
    if (this.props.recipientVia && this.props.recipientVia.length > 0) {
      via = (
        <span className="apprisal-menu-more-recipient-via">
        ({this.props.recipientVia})
        </span>
      );
    }
    const identifier = `${formId}-${id}`;
    return (
      <label htmlFor={identifier}>
        <input
          id={identifier}
          type="checkbox"
          name={id}
          checked={checked}
          onChange={this.onChange}
          style={{ marginRight: '5px' }}
        />
        {name} {via}
      </label>
    );
  }
}
RecipientCheckbox.propTypes = {
  checked: React.PropTypes.bool.isRequired,
  recipientName: React.PropTypes.string.isRequired,
  recipientVia: React.PropTypes.string,
  recipientId: React.PropTypes.string.isRequired,
  formId: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

class Apprise extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }
  onChange(recipientId) {
    this.props.onChange(recipientId);
  }
  render() {
    const more = [];
    const sr = this.props.selectedRecipientIds;
    const self = this;
    this.props.recipients.forEach(function eachRecipient(recipient) {
      const recipientsIndex = sr.findIndex(function findSelected(selectedRecipientId) {
        return selectedRecipientId === recipient.id;
      });
      const checked = recipientsIndex > -1;
      more.push(
        <div key={recipient.id} className="apprisal-menu-more-recipient">
          <RecipientCheckbox
            checked={checked}
            recipientName={recipient.displayName}
            recipientVia={recipient.email}
            recipientId={recipient.id}
            onChange={self.onChange}
            formId={self.props.formId}
          />
        </div>,
      );
    });
    let canSubmitMsg = null;
    if (!this.props.userCanSubmit && this.props.userCannotSubmitMessage) {
      canSubmitMsg = (
        <div className="apprisal-menu-more-disabled">
          {this.props.userCannotSubmitMessage}
        </div>
      );
    }
    return (
      <div className="apprisal-menu-more">

        <div className="apprisal-menu-more-title">Share with...</div>
        <div className="apprisal-menu-more-options">
          {more}
        </div>
        {canSubmitMsg}
        <div className="apprisal-menu-more-button">
          <SNSButton
            label="Send"
            onClick={this.onSubmit}
            buttonSize={ButtonSize.INLINE}
            disabled={
              this.props.submitting ||
              this.props.selectedRecipientIds.length === 0 ||
              !this.props.userCanSubmit
            }
            showSpinner={this.props.submitting}
          />
        </div>
      </div>
    );
  }
}
Apprise.propTypes = {
  selectedRecipientIds: React.PropTypes.arrayOf(React.PropTypes.string),
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  submitting: React.PropTypes.bool.isRequired,
  userCanSubmit: React.PropTypes.bool.isRequired,
  userCannotSubmitMessage: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default Apprise;
