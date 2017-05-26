import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router';
import HeaderLoggedInButton from './HeaderLoggedInButton';

export const Header = props => (
  <div>
    <nav className="top-navigation">
      <div className="content">
        <div className="top-navigation-left">
          <img
            className="logo"
            src="../assets/dandy-white.svg"
            alt="Social, Not Social logo"
            width="40"
            height="40"
            style={{ marginTop: '-10px', marginRight: '5px' }}
          />
          <span className="top-title">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Social, Not Social</Link> <span className="title-beta">(Beta)</span>
          </span>
          <span className="welcome">
            <HeaderLoggedInButton displayName={props.displayName} routerpush={props.routerpush} dispatch={props.dispatch} />
          </span>
        </div>
      </div>
    </nav>
    <div className="topSpacer" />
  </div>
);

Header.defaultProps = {
  displayName: 'Guest',
};

Header.propTypes = {
  displayName: React.PropTypes.string,
  routerpush: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownProps) {
  console.log(`ownprops: ${ownProps}`);
  return {
    displayName: state.account.displayName,
    routerpush: ownProps.router.push,
  };
};

const Container = connect(mapStateToProps)(Header);

export default Container;
