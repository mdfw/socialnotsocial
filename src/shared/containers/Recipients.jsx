import { connect } from 'react-redux';
import React from 'react';
import Recipient from '../components/Recipient';
import RecipientEdit from './RecipientEdit';
import RecipientDelete from './RecipientDelete';
import { formUpdate } from '../actions/forms';

/* Renders if there are no posts */
const noPostsStyle = {
  textAlign: 'center',
  fontSize: '20px',
  color: '#4376a3',
  marginTop: '30px',
};

const NoRecipients = () => (
  <div>
    <RecipientEdit
      formId="newRecipient"
      editType="new"
    />
    <div id="noRecipient" style={noPostsStyle}>
      There are no recipients to show. Yet.
    </div>
  </div>
);

/* Renders a list of recipients */
const AllRecipients = (props) => {
  const recipientList = [];
  props.recipients.map((recipient) => { // eslint-disable-line array-callback-return
    if (recipient.id) {
      const editRecipientFormName = `editRecipient${recipient.id}`;
      const allForms = props.allForms;
      const editForm = allForms[editRecipientFormName];
      if (editForm && editForm.editType === 'edit') {
        recipientList.push(
          <RecipientEdit
            key={recipient.id}
            formId={editRecipientFormName}
            editType="edit"
            recipientEditing={recipient}
          />,
        );
      } else if (editForm && editForm.editType === 'delete') {
        recipientList.push(
          <RecipientDelete
            key={recipient.id}
            formId={editRecipientFormName}
            recipientDeleting={recipient}
          />,
        );
      } else {
        recipientList.push(
          <Recipient
            key={recipient.id}
            recipient={recipient}
            handleEditRequest={props.handleEditRequest}
            handleDeleteRequest={props.handleDeleteRequest}
          />,
        );
      }
    }
  });
  return (
    <div className="board">
      <RecipientEdit
        key="newRecipient"
        formId="newRecipient"
        editType="new"
      />
      {recipientList}
    </div>
  );
};
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
AllRecipients.propTypes = {
  allForms: React.PropTypes.object,
  recipients: React.PropTypes.array,
  handleEditRequest: React.PropTypes.func.isRequired,
  handleDeleteRequest: React.PropTypes.func.isRequired,
};
/* eslint-enable react/no-unused-prop-types */
/* eslint-enable react/forbid-prop-types */

/* Main container that manages showing of posts */
class RecipientsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditRequest = this.handleEditRequest.bind(this);
    this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
  }
  handleEditRequest(recipientId) {
    const editRecipientFormName = `editRecipient${recipientId}`;
    this.props.dispatch(
      formUpdate(editRecipientFormName, { editType: 'edit' }),
    );
  }
  handleDeleteRequest(recipientId) {
    const editRecipientFormName = `editRecipient${recipientId}`;
    this.props.dispatch(
      formUpdate(editRecipientFormName, { editType: 'delete' }),
    );
  }

  render() {
    if (this.props.recipients.length === 0) {
      return <NoRecipients />;
    }
    return (
      <AllRecipients
        key="allTheRecipients"
        recipients={this.props.recipients}
        handleEditRequest={this.handleEditRequest}
        handleDeleteRequest={this.handleDeleteRequest}
        allForms={this.props.allForms}
      />
    );
  }
}

RecipientsContainer.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  dispatch: React.PropTypes.func.isRequired,
  allForms: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    recipients: state.recipients.recipients,
    allForms: state.forms,
  };
};

const Container = connect(mapStateToProps)(RecipientsContainer);

export default Container;
