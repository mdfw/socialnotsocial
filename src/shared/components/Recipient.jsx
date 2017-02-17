import React from 'react';
import moment from 'moment';

class Recipient extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
  }

  render() {
    const createdTime = moment(this.props.createdAt).fromNow();

    return (
      <div className="recipient">
        <form>
          <input type="text" name="name" value={this.props.name} />
          <fieldset>
            <legend>Type:</legend>
            <input id="email" type="radio" name="email" value="email" />
            <label htmlFor="email">Email</label>
          </fieldset>
          <input type="text" name="emailAddress" value={this.props.email} />
        </form>
      </div>
    );
  }
}

Recipient.propTypes = {
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  canRespond: React.PropTypes.bool.isRequired,
  validated: React.PropTypes.bool.isRequired,
  validatedAt: React.PropTypes.string,
  createdAt: React.PropTypes.string.isRequired,
  updatedAt: React.PropTypes.string.isRequired,
  unsubscribedAt: React.PropTypes.string,
  unsubscribedReason: React.PropTypes.string,
};


export default Recipient;
