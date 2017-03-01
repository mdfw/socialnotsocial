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

function ApprisalSummaryWithRecipients({ sharedCount, apprisals, recipients }) {
  let sharedWith = 'Not shared.';
  if (sharedCount === 1) {
    sharedWith = `Shared with ${recipientName(apprisals[0].recipient_id, recipients)}.`;
  } else if (sharedCount > 1) {
    sharedWith = `Shared ${apprisals.length - 1} times, including ${apprisals[0].displayName}.`;
  }
  return sharedWith;
}

function ApprisalSummaryWithoutRecipients({ sharedCount }) {
  let sharedWith = 'Not shared.';
  if (sharedCount === 1) { // eslint-disable-line no-lonely-if
    sharedWith = 'Shared once.';
  } else if (sharedCount > 1) {
    sharedWith = `Shared ${sharedCount} times.`;
  }
  return sharedWith;
}

function ApprisalSummary({ apprisals, recipients }) {
  let sharedWith = 'Not shared.';
  let sharedCount = 0;
  if (apprisals && apprisals.length > 0) {
    sharedCount = apprisals.length;
  }

  if (recipients && recipients.length > 0) {
    sharedWith = ApprisalSummaryWithRecipients({ sharedCount, apprisals, recipients });
  } else {
    sharedWith = ApprisalSummaryWithoutRecipients({ sharedCount });
  }
  return (
    <span className="post-apprisal-summary">{sharedWith}</span>
  );
}
ApprisalSummary.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

function ApprisalListWithRecipients({ apprisals, recipients }) {
  const apprisalList = [];
  apprisals.forEach(function listApprisals(apprisal) {
    let sentOn = 'Not yet sent';
    if (apprisal.deliveredAt) {
      sentOn = `Sent ${apprisal.deliveredAt}`;
    }
    apprisalList.push(
      <div key={apprisal.recipient_id}>
        <div className="post-apprisal-list-name">
          {recipientName(apprisal.recipient_id, recipients)}
        </div>
        <div className="post-apprisal-list-name">
          {sentOn}
        </div>
      </div>,
    );
  });
  return (<div>{apprisalList.join(' ')}</div>);
}
ApprisalListWithRecipients.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};


function ApprisalList({ apprisals, recipients }) {
  let sharedWith = null;
  let sharedCount = 0;
  if (apprisals && apprisals.length > 0) {
    sharedCount = apprisals.length;
  }
  if (recipients && recipients.length > 0 && sharedCount > 0) {
    sharedWith = ApprisalListWithRecipients({ sharedCount, apprisals, recipients });
  } else {
    sharedWith = ApprisalSummaryWithoutRecipients({ sharedCount });
  }
  return (
    <span className="post-apprisal-list">{sharedWith}</span>
  );
}
ApprisalList.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};


function Apprisals(props) { // eslint-disable-line react/no-multi-comp
  let summarize = true;
  if (typeof props.summarize !== 'undefined') {
    summarize = props.summarize;
  }
  if (summarize) {
    return (
      <ApprisalSummary apprisals={props.apprisals} recipients={props.recipients} />
    );
  }
  return (
    <ApprisalList apprisals={props.apprisals} recipients={props.recipients} />
  );
}

Apprisals.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  summarize: React.PropTypes.bool, // Default: true
};


/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    recipients: state.recipients.recipients,
  };
};

const Container = connect(mapStateToProps)(Apprisals);

export default Container;
