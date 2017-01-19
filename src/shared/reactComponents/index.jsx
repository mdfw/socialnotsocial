import React from 'react';

/* eslint-disable react/prop-types */

export default class AppView extends React.Component { // eslint-disable-line 
  render() {
    return (
      <div id="app-view">
        <h1>Todos</h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
/* eslint-enable react/prop-types */
