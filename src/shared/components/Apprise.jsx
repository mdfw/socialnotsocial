import React from 'react';
import moment from 'moment';
import { SNSButton, ButtonStyle, ButtonSize } from './ui/SNSButton';

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
  }
  if (apprisalsForRecipient.length > 0) {
    return ({
      apprisals: apprisalsForRecipient,
      lastApprised: lastApprisedDate,
    })
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
    const checked = this.props.checked,
    const name = this.props.recipientName;
    const id = this.props.recipientId;
    const formId = this.props.formId;
    let via = null;
    if (this.props.recipientVia && this.props.recipientVia.length > 0) {
      via = `(${recipientVia})`;
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
        {name}{via}
      </label>
    )
  }
}
RecipientCheckbox.propTypes = {
  checked: React.PropTypes.string.bool.isRequired,
  recipientName: React.PropTypes.string.isRequired,
  recipientVia: React.PropTyeps.string,
  recipientId: React.PropTypes.string.isRequired,
  formId: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

class Apprise extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();
  }
  onChange(recipientId) {
    this.props.onChange(recipientId);
  }
  render() {
    const more = [];
    const sr = this.props.selectedRecipients;
    props.recipients.forEach(function eachRecipient(recipient) {
      const recipientsIndex = sr.findIndex(function findSelected(selectedRecipientId) {
        return selectedRecipientId === recipient.id;
      })
      const checked = recipientsIndex > -1;
      more.push(
        <div key={recipient.id} className="apprisal-menu-more-recipient">
          <RecipientCheckbox
            checked={checked}
            recipientName={recipient.displayName}
            recipientVia={recipient.email}
            recipientId={recipient.id}
            onChange={this.onChange}
            formId={this.props.formId}
          />
        </div>,
      );
    });
    return (
      <div className="apprisal-menu-more">
        <div className="apprisal-menu-more-title">Share with...</div>
        {more}
      </div>
    );
  }
};
Apprise.propTypes = {
  selectedRecipients: React.PropTypes.arrayOf(React.PropTypes.string),
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  formId: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default Apprise;
