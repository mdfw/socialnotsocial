import { connect } from 'react-redux';
import React from 'react';
import Header from '../components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function App(props) {
  return (
    <MuiThemeProvider>
      <div id="mainapp">
        <Header />
        {props.children}
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.any,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownprops) {
  return {
    children: ownprops.children,
  };
};

const Container = connect(mapStateToProps)(App);

export default Container;
