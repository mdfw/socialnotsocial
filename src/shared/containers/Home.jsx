import { connect } from 'react-redux';
import React from 'react';

function Home(props) {
  return (
    <div id="board">
      Here should be many many posts for {props.accountId}.
    </div>
  );
}

Home.propTypes = {
  accountId: React.PropTypes.string,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    accountId: state.account.number,
  };
};

const Container = connect(mapStateToProps)(Home);

export default Container;
