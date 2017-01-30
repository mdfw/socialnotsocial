import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  padding: 20,
  textAlign: 'center',
  display: 'inline-block',
  marginTop: '20px',
  width: '600px',
};

const innerStyle = {
  display: 'table',
  margin: '0 auto',
};

const NotImplemented = () => (
  <div id="registerPage">
    <div style={innerStyle}>
      <Paper zDepth={2} style={style}>
        This functionality is not yet implemented.
      </Paper>
    </div>
  </div>
);

export default NotImplemented;
