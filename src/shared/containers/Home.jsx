import { connect } from 'react-redux';
import React from 'react';

function Home(props) {
  return (
    <div id="home">
      Hi, you are home.
      { props.children }
    </div>
  );
}

Home.propTypes = {
  children: React.PropTypes.element.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownprops) {
  return {
    children: ownprops.children,
  };
};

const Container = connect(mapStateToProps)(Home);

export default Container;
