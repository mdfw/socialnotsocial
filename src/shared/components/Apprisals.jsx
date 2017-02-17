import React from 'react';
import { connect } from 'react-redux';

function recipientName(recipientId, recipients) {
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
    return foundR.displayName;
  }
  return '';
}

function ApprisalInfoWithRecipients({ sharedCount, apprisals, recipients }) {
  let sharedWith = 'Not shared.';
  if (sharedCount === 1) {
    sharedWith = `Shared with ${recipientName(apprisals[0].recipient_id, recipients)}.`;
  } else if (sharedCount > 1) {
    sharedWith = `Shared with ${apprisals[0].displayName} and ${apprisals.length - 1} more.`;
  }
  return sharedWith;
}

function ApprisalInfoWithoutRecipients({ sharedCount }) {
  let sharedWith = 'Not shared.';
  if (sharedCount === 1) { // eslint-disable-line no-lonely-if
    sharedWith = 'Shared once.';
  } else if (sharedCount > 1) {
    sharedWith = `Shared with ${sharedCount} times.`;
  }
  return sharedWith;
}

function ApprisalInfo({ apprisals, recipients }) {
  let sharedWith = 'Not shared.';
  let sharedCount = 0;
  if (apprisals && apprisals.length > 0) {
    sharedCount = apprisals.length;
  }

  if (recipients && recipients.length > 0) {
    sharedWith = ApprisalInfoWithRecipients({ sharedCount, apprisals, recipients });
  } else {
    sharedWith = ApprisalInfoWithoutRecipients({ sharedCount });
  }
  return (
    <span className="post-apprisal-shared-with">{sharedWith}</span>
  );
}
ApprisalInfo.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};


function Apprisals(props) { // eslint-disable-line react/no-multi-comp
  return (
    <span className="apprisal-holder">
      <ApprisalInfo apprisals={props.apprisals} recipients={props.recipients} />
    </span>
  );
}

Apprisals.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};


/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    recipients: state.recipients.recipients,
  };
};

const Container = connect(mapStateToProps)(Apprisals);

export default Container;
