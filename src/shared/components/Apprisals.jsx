import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Share from 'material-ui/svg-icons/social/share';

function recipientName(recipientId, recipients) {
  if (!recipientId || !recipients) {
    return '';
  }
  const foundR =  recipients.find(function findId(recipient) {
    if (recipientId === recipient.id) {
      return true;
    }
  })
  if (foundR) {
    return foundR.displayName;
  }
  return '';
}

function ApprisalInfo({ apprisals, recipients }) {
  let sharedWith = 'Not shared.';
  let sharedCount = 0;
  if (apprisals && apprisals.length > 0) {
    sharedCount = apprisals.length;
  }

  if (recipients && recipients.length > 0) {
    if (sharedCount === 1) {
      sharedWith = `Shared with ${recipientName(apprisals[0].recipient_id, recipients)}.`;
    } else if (sharedCount > 1) {
      sharedWith = `Shared with ${apprisals[0].displayName} and ${apprisals.length - 1} more.`;
    }
  } else {
    if (sharedCount === 1) {
      sharedWith = `Shared once.`;
    } else if (sharedCount > 1) {
      sharedWith = `Shared with ${sharedCount} times.`;
    }
  }
  
  
  return (
    <span className="post-apprisal-shared-with">{sharedWith}</span>
  );
}

const ShareMenu = () => (
  <div>
      <List>
        <Subheader>Shared</Subheader>
        <ListItem
          primaryText="Grandma"
          secondaryText="2 days ago"
        />
      </List>
      <Divider />
      <List>
        <Subheader>Share more</Subheader>
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Uncle Joe"
          secondaryText="Email"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="James"
          secondaryText="Text"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Facebook"
        />
      </List>
      <button title="share" />
  </div>
)

const shareButtonStyle = {
    border: '0.5px solid rgba(204, 204, 204, 0.54)',
    padding: '1px 10px',
    fontSize: '12px',
    color: 'grey',
    borderRadius: '3px',
    marginLeft: '5px',
    backgroundColor: 'white',
    verticalAlign: 'middle',
    outline: '0px',
};

class Apprisals extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
    this.state = { showMore: false };
    this.switchMenu = this.switchMenu.bind(this);
  }
  switchMenu() {
    this.setState({
      showMore: !this.state.showMore,
    })
  }
  render () {
    let share = null;
    if (this.state.showMore) {
      share = <ShareMenu />;
    }
    return (
      <span className="apprisal-holder">
        <ApprisalInfo apprisals={this.props.apprisals} recipients={this.props.recipients} />
        <button onClick={this.switchMenu} style={shareButtonStyle}>Share</button> 
        {share}
      </span>
    );
  }
}

Apprisals.propTypes = {
  recipients: React.PropTypes.array,
  apprisals: React.PropTypes.array,
};


/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    recipients: state.recipients.recipients,
  };
};

const Container = connect(mapStateToProps)(Apprisals);

export default Container;
