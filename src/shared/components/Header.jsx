import { connect } from 'react-redux';
import React from 'react';
import HeaderLoggedInButton from './HeaderLoggedInButton';


const Header = props => (
  <div>
    <nav className="top-navigation">
      <div className="content">
        <div className="top-navigation-left">
          <span className="top-title">
            Social, Not Social (Beta)
          </span>
          <span className="welcome">
            <HeaderLoggedInButton displayName={props.displayName} />
          </span>
        </div>
      </div>
    </nav>
    <div className="topSpacer" />
  </div>
);

Header.propTypes = {
  displayName: React.PropTypes.string,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    displayName: state.account.displayName,
  };
};

const Container = connect(mapStateToProps)(Header);

export default Container;
