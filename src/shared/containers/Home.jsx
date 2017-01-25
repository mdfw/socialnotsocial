import { connect } from 'react-redux';
import React from 'react';
import Board from './Board';
import Welcome from '../components/Welcome';

function Home(props) {
  console.log(`At home authenticated: ${props.authenticated} id: ${props.accountId}`);
  let direction = <Welcome />;
  if (props.authenticated && props.accountId) {
    direction = <Board />;
  }
  return (
    <div id="home">
      Hi, you are home.
      { direction }
    </div>
  );
}

Home.propTypes = {
  authenticated: React.PropTypes.bool,
  accountId: React.PropTypes.string,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    authenticated: state.account.authenticated,
    accountId: state.account.accountId,
  };
};

const Container = connect(mapStateToProps)(Home);

export default Container;
