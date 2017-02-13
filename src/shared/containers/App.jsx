import { connect } from 'react-redux';
import React from 'react';
import Header from '../components/Header';

function App(props) {
  return (
    <div id="mainapp">
      <Header urlPath={props.urlPath} />
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
  urlPath: React.PropTypes.string,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownprops) {
  return {
    children: ownprops.children,
    urlPath: ownprops.location.pathname,
  };
};

const Container = connect(mapStateToProps)(App);

export default Container;
