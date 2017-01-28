import { connect } from 'react-redux';
import React from 'react';
import { fetchAccount } from '../actions/account';

const outerDivStyle = {
  height: '10em',
  position: 'relative',
};

const announceTextStyle = {
  margin: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  fontWeight: 400,
};

/* Main container that manages showing of posts */
class HomeDirectorLogin extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAccount());
  }
  render() {
    return (
      <div style={outerDivStyle} >
        <p style={announceTextStyle}>Checking your login...</p>
      </div>
    );
  }
}

HomeDirectorLogin.propTypes = {
  dispatch: React.PropTypes.func,
};

const Container = connect()(HomeDirectorLogin);

export default Container;
