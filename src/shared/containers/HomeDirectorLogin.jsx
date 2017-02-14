import { connect } from 'react-redux';
import React from 'react';
import { fetchAccount } from '../actions/account';


const style1 = {
  top: '50%',
  left: '50%',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
};

const style2 = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
};

const style3 = {
  width: '150px',
  margin: '5px',
  textAlign: 'center',
};

const style4 = {
  width: '150px',
  margin: '5px',
  textAlign: 'center',
  color: 'grey',
};

/* Main container that manages showing of posts */
class HomeDirectorLogin extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAccount());
  }
  render() {
    return (
      <div style={style1}>
        <div style={style2}>
          <div style={style3}>
            <img src="assets/dandelion.svg" alt="Dandelion logo" width="100px" height="100px" />
          </div>
          <div style={style3}>
            Social, Not Social
          </div>
          <div style={style4}>
            Setting up and checking login
          </div>
        </div>
      </div>
    );
  }
}

HomeDirectorLogin.propTypes = {
  dispatch: React.PropTypes.func,
};

const Container = connect()(HomeDirectorLogin);

export default Container;
