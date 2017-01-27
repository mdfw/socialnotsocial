import { connect } from 'react-redux';
import React from 'react';
import Home from './Home';
import Welcome from '../components/Welcome';

function HomeDirector(props) {
  console.log(`At home authenticated: ${props.authenticated} id: ${props.accountId}`);
  let direction = <Welcome />;
  if (props.authenticated && props.accountId) {
    direction = <Home />;
  }
  return (
    <div id="home">
      { direction }
    </div>
  );
}

HomeDirector.propTypes = {
  authenticated: React.PropTypes.bool,
  accountId: React.PropTypes.number,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    authenticated: state.account.authenticated,
    accountId: state.account.accountId,
  };
};

const Container = connect(mapStateToProps)(HomeDirector);

export default Container;
