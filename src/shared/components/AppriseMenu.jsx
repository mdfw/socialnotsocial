import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SNSButton, ButtonStyle, ButtonSize } from './ui/SNSButton';
import { newApprisal } from '../actions/apprisals';

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


const Apprised = function alreadyShared(props) {
  if (!props.apprisals || props.apprisals.length === 0) {
    return (
      <div className="apprisal-menu-apprised">
        <div className="apprisal-menu-apprised-notTitle">
          This item has not been shared.
        </div>
      </div>
    );
  }
  const already = [];
  props.apprisals.forEach(function eachApprisal(apprisal) {
    const name = recipientInfo(apprisal.recipient_id, props.recipients).displayName;
    already.push(<div key={apprisal.id}>{name}</div>);
  });
  return (
    <div className="apprisal-menu-apprised">
      <div className="apprisal-menu-apprised-title">
        Shared with:
      </div>
      {already}
    </div>
  );
};
Apprised.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};


const AppriseMore = function shareMore(props) {
  const more = [];
  props.recipients.forEach(function eachRecipient(recipient) {
    more.push(
      <div key={recipient.id} className="apprisal-menu-more-recipient">
        <div className="apprisal-menu-more-recipient-name">{recipient.displayName}</div>
        <div className="apprisal-menu-more-recipient-type">to: {recipient.email}</div>
      </div>,
    );
  });
  return (
    <div className="apprisal-menu-more">
      <div className="apprisal-menu-more-title">Share with...</div>
      {more}
    </div>
  );
};
AppriseMore.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  postId: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};


class AppriseMenu extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
  }
  render() {
    return (
      <div className="apprisal-menu--holder">
        <AppriseMore recipients={this.props.recipients} postId={this.props.postId} dispatch={this.props.dispatch} />
        <Apprised recipients={this.props.recipients} apprisals={this.props.apprisals} />
      </div>
    );
  }
}
AppriseMenu.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  dispatch: React.PropTypes.func.isRequired,
  postId: React.PropTypes.string.isRequired,
};


/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    recipients: state.recipients.recipients,
  };
};

const Container = connect(mapStateToProps)(AppriseMenu);

export default Container;
