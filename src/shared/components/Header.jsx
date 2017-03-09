import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router';
import HeaderLoggedInButton from './HeaderLoggedInButton';


const Header = props => (
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
            <HeaderLoggedInButton displayName={props.displayName} router={props.router} />
          </span>
        </div>
      </div>
    </nav>
    <div className="topSpacer" />
  </div>
);

Header.propTypes = {
  displayName: React.PropTypes.string,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    displayName: state.account.displayName,
    router: ownProps.router,
  };
};

const Container = connect(mapStateToProps)(Header);

export default Container;
