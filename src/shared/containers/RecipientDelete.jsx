import { connect } from 'react-redux';
import React from 'react';
import { deleteRecipient } from '../actions/recipients';
import { formClear } from '../actions/forms';
import Recipient from '../components/Recipient';
import { SNSButton, ButtonStyle, ButtonSize } from '../components/ui/SNSButton';

/*
  id:
  type: email, text, post, facebook
  status; active, validating, removed, bouncing, unsubscribed
  displayName:
  email:
  canRespond:
  validatedAt:
  validated:
  unsubscribedAt:
  unsubscribedReason:
  */

class RecipientDelete extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleDelete() {
    this.props.dispatch(
      deleteRecipient(
        this.props.recipientDeleting.id,
        this.props.formId,
      ),
    );
  }
  handleCancel() {
    console.log(`Cancelling delete of ${this.props.formId}`);
    this.props.dispatch(
      formClear(this.props.formId),
    );
  }
  render() {
    let submitting = false;
    if (this.props.submitting) {
      submitting = this.props.submitting;
    }
    const deleteButtonLabel = `Delete ${this.props.recipientDeleting.displayName}`;

    return (
      <div className="recipient-delete-form">
        <form onSubmit={this.handleCancel}>
          <div className="recipient-delete-name">
            Delete {this.props.recipientDeleting.displayName} ?
          </div>

          <Recipient recipient={this.props.recipientDeleting} />
          <div className="recipient-delete-controls">
            <div className="recipient-delete-delete-button">
              <SNSButton
                label={deleteButtonLabel}
                type="button"
                onClick={this.handleDelete}
                disabled={submitting}
                buttonSize={ButtonSize.SMALL}
                buttonStyle={ButtonStyle.DANGER}
              />
            </div>
            <div className="recipient-delete-cancel-button">
              <SNSButton
                label="Cancel"
                type="submit"
                disabled={submitting}
                showSpinnger={submitting}
                buttonSize={ButtonSize.SMALL}
                buttonStyle={ButtonStyle.SECONDARY}
                onClick={this.handleCancel}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

RecipientDelete.propTypes = {
  formId: React.PropTypes.string.isRequired,
  submitting: React.PropTypes.bool,
  recipientDeleting: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string,
    email: React.PropTypes.string,
    canRespond: React.PropTypes.bool.isRequired,
    validated: React.PropTypes.bool,
    validatedAt: React.PropTypes.string,
    created_at: React.PropTypes.string.isRequired,
    updated_at: React.PropTypes.string.isRequired,
    unsubscribedAt: React.PropTypes.string,
    unsubscribedReason: React.PropTypes.string,
  }).isRequired,
  dispatch: React.PropTypes.func.isRequired,
};


/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownProps) {
  const ourFormId = ownProps.formId;
  const curForm = state.forms[ourFormId];
  if (!curForm) {
    return {};
  }
  return {
    submitting: state.forms[ourFormId].submitting,
  };
};

const Container = connect(mapStateToProps)(RecipientDelete);

export default Container;
