import { connect } from 'react-redux';
import React from 'react';
import HeaderContainer from '../components/Header';

function App(props) {
  return (
    <div id="mainapp">
      <div className="content">
        <HeaderContainer router={props.router} />
        {props.children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    children: ownProps.children,
  };
};

const Container = connect(mapStateToProps)(App);

export default Container;
