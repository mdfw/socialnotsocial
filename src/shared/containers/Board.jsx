import { connect } from 'react-redux';
import React from 'react';

function Board(props) {
  return (
    <div id="board">
      Here should be many many posts for {props.accountId}.
    </div>
  );
}

Board.propTypes = {
  accountId: React.PropTypes.string,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    accountId: state.account.number,
  };
};

const Container = connect(mapStateToProps)(Board);

export default Container;
