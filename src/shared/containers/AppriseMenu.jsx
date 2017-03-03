import React from 'react';
import { connect } from 'react-redux';
import Apprise from '../components/Apprise';
import { formUpdate } from '../actions/forms';
import { newApprisal } from '../actions/apprisals';
import { UserType } from '../../apiserver/models/constants';

class AppriseMenu extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    const recipientIds = [];
    this.props.selectedRecipientIds.forEach((recipientId) => {
      recipientIds.push({
        recipientId: recipientId,
        canRespond: true,
      });
    });
    this.props.dispatch(
      newApprisal(
        {
          postId: this.props.postId,
          recipients: recipientIds,
        },
        this.props.postId,
        this.props.formId,
      ),
    );
  }
  onChange(recipientId) {
    let newRecipientIds = this.props.selectedRecipientIds;
    const foundIndex = this.props.selectedRecipientIds.findIndex(selRecipientId =>
      (
        selRecipientId === recipientId
      ),
    );
    if (foundIndex > -1) {
      const frontPart = this.props.selectedRecipientIds.slice(0, foundIndex);
      const endPart = this.props.selectedRecipientIds.slice(foundIndex + 1);
      newRecipientIds = frontPart.concat(endPart);
    } else {
      newRecipientIds = this.props.selectedRecipientIds.concat(recipientId);
    }
    this.props.dispatch(
      formUpdate(
        this.props.formId,
        {
          selectedRecipientIds: newRecipientIds,
        },
      ),
    );
  }
  render() {
    let canNotSubmitMsg = null;
    let canSubmit = true;
    if (this.props.accountType === UserType.DEMO) {
      canNotSubmitMsg = 'Can not share - demo account.';
      canSubmit = false;
    } else if (!this.props.accountValidated) {
      canNotSubmitMsg = 'Can not share - account has not been validated.';
      canSubmit = false;
    }
    return (
      <div className="apprisal-menu--holder">
        <Apprise
          selectedRecipientIds={this.props.selectedRecipientIds}
          recipients={this.props.recipients}
          apprisals={this.props.apprisals}
          formId={this.props.formId}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          submitting={this.props.submitting}
          userCanSubmit={canSubmit}
          userCannotSubmitMessage={canNotSubmitMsg}
        />
      </div>
    );
  }
}
AppriseMenu.propTypes = {
  selectedRecipientIds: React.PropTypes.arrayOf(React.PropTypes.string),
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  dispatch: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  accountType: React.PropTypes.string.isRequired,
  accountValidated: React.PropTypes.bool.isRequired,
  postId: React.PropTypes.string.isRequired,
  formId: React.PropTypes.string.isRequired,
};


/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownProps) {
  const formId = `appriseForm${ownProps.postId}`;
  let selectedRecipientIds = [];
  let submitting = false;
  const ourForm = state.forms[formId];
  if (ourForm && ourForm.selectedRecipientIds && ourForm.selectedRecipientIds.length > 0) {
    selectedRecipientIds = ourForm.selectedRecipientIds;
  }
  if (ourForm && typeof ourForm.submitting !== 'undefined') {
    submitting = ourForm.submitting;
  }
  return {
    recipients: state.recipients.recipients,
    selectedRecipientIds: selectedRecipientIds,
    formId: formId,
    submitting: submitting,
    accountType: state.account.accountType,
    accountValidated: state.account.validated,
  };
};

const Container = connect(mapStateToProps)(AppriseMenu);

export default Container;
