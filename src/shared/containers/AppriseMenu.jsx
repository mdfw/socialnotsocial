import React from 'react';
import { connect } from 'react-redux';
import Apprise from '../components/Apprise';
import { formUpdate } from '../actions/forms';
import { newApprisal } from '../actions/apprisals';

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
    console.log(`AppriseMenu: received: ${recipientId}`);
    let newRecipientIds = this.props.selectedRecipientIds;
    const foundIndex = this.props.selectedRecipientIds.findIndex(selRecipientId =>
      (
        selRecipientId === recipientId
      ),
    );
    console.log(`AppriseMenu: foundIndex: ${foundIndex}`);
    if (foundIndex > -1) {
      newRecipientIds.splice(foundIndex, 1);
    } else {
      newRecipientIds = this.props.selectedRecipientIds.concat(recipientId);
    }
    console.log(`AppriseMenu: sending newRecipientIds: ${newRecipientIds}`);
    console.dir(newRecipientIds);
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
  };
};

const Container = connect(mapStateToProps)(AppriseMenu);

export default Container;
