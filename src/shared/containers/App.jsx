import { connect } from 'react-redux';
import React from 'react';
import Header from '../components/Header';

function App(props) {
  console.log('Loading app');
  return (
    <div id="mainapp">
      <div className="content">
        <Header />
        {props.children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownprops) {
  return {
    children: ownprops.children,
  };
};

const Container = connect(mapStateToProps)(App);

export default Container;
