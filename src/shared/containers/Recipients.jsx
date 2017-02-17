import { connect } from 'react-redux';
import React from 'react';
import Recipient from '../components/Recipient';
import NotImplmented from '../components/NotImplemented';

/* Renders if there are no posts */
const noPostsStyle = {
  textAlign: 'center',
  fontSize: '20px',
  color: '#4376a3',
  marginTop: '30px',
};

const NoRecipients = () => (
  <div id="noRecipient" style={noPostsStyle}>
    There are no recipients to show. Yet.
  </div>
);

/* Renders a list of recipients */
const AllRecipients = ({ recipients }) => (
  <div>
    {recipients.map(recipient => (
      <Recipient
        key={recipient.id}
        id={recipient.id}
        type={recipient.type}
        status={recipient.status}
        name={recipient.displayName}
        email={recipient.email}
        canRespond={recipient.canRespond}
        validated={recipient.validated}
        validatedAt={recipient.validated_at}
        createdAt={recipient.created_at}
        updatedAt={recipient.updated_at}
        unsubscribedAt={recipient.unsubscribed_at}
        unsubscribedReason={recipient.unsubscribed_reason}
      />
    ))}
  </div>
);
AllRecipients.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

/* Main container that manages showing of posts */
class RecipientsContainer extends React.Component {
  componentDidMount() {
  }
  render() {
    console.log('Here is recipients');
    console.dir(this.props.recipients);
    if (PRODUCTION) { // eslint-disable-line no-undef
      return (
        <div style={{ backgroundColor: 'white', padding: '30px', margin: '30px' }}>
          <NotImplmented />
        </div>
      );
    } else if (this.props.recipients.length === 0) {
      return <NoRecipients />;
    }
    return (
      <AllRecipients recipients={this.props.recipients} />
    );
  }
}

RecipientsContainer.propTypes = {
  recipients: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    recipients: state.recipients.recipients,
  };
};

const Container = connect(mapStateToProps)(RecipientsContainer);

export default Container;
