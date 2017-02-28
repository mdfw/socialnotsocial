import React from 'react';
import moment from 'moment';
import { RecipientStatus } from '../../apiserver/models/constants';
import { SNSButton, ButtonSize, ButtonStyle } from '../components/ui/SNSButton';

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
const Recipient = (props) => { // eslint-disable-line react/no-multi-comp
  const onEditClick = function onEditClick() {
    if (props.handleEditRequest) {
      props.handleEditRequest(props.recipient.id);
    }
  };
  const onDeleteClick = function onDeleteClick() {
    if (props.handleDeleteRequest) {
      props.handleDeleteRequest(props.recipient.id);
    }
  };
  const recipient = props.recipient;
  const createdTime = moment(recipient.created_at).fromNow();
  let updatedTime = '';
  if (recipient.updated_at && (recipient.updated_at !== recipient.created_at)) {
    updatedTime = `Updated: ${moment(recipient.updated_at).fromNow()}`;
  }
  let canRespond = 'Can respond';
  if (!recipient.canRespond) {
    canRespond = (<span className="recipient-cannot-respond">Cannot respond</span>);
  }
  let status = null;
  if (recipient.status !== RecipientStatus.ACTIVE) {
    status = (
      <div className="recipient-display-status">
        {recipient.status}
      </div>
    );
  }
  let editControls = null;
  const editButtons = [];
  if (props.handleEditRequest) {
    const key = `editRequest${recipient.id}`;
    editButtons.push(
      <div className="recipient-display-controls-edit-button" key={key}>
        <SNSButton
          label="Edit"
          type="button"
          onClick={onEditClick}
          buttonSize={ButtonSize.INLINE}
          buttonStyle={ButtonStyle.PRIMARY_OUTLINE}
        />
      </div>,
    );
  }
  if (props.handleDeleteRequest) {
    const key = `deleteRequest${recipient.id}`;
    editButtons.push(
      <div className="recipient-display-controls-delete-button" key={key}>
        <SNSButton
          label="Delete"
          type="button"
          onClick={onDeleteClick}
          buttonSize={ButtonSize.INLINE}
          buttonStyle={ButtonStyle.WARNING_OUTLINE}
        />
      </div>,
    );
  }
  if (editButtons.length > 0) {
    editControls = (
      <div className="recipient-display-controls">
        {editButtons}
      </div>
    );
  }
  return (
    <div className="recipient-card">
      <div className="recipient-display-name">
        {recipient.displayName}
      </div>
      <div className="recipient-display-email">
        Email to: {recipient.email}
      </div>
      <div className="recipient-display-canRespond">
        {canRespond}
      </div>
      <div className="recipient-display-createdTime">
        Created: {createdTime}{updatedTime}
      </div>
      {status}
      {editControls}
    </div>
  );
};
Recipient.propTypes = {
  recipient: React.PropTypes.shape({
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
  handleEditRequest: React.PropTypes.func,
  handleDeleteRequest: React.PropTypes.func,
};

export default Recipient;
