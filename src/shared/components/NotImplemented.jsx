import React from 'react';

const style = {
  padding: 20,
  textAlign: 'center',
  display: 'inline-block',
  margin: '0 auto',
  width: '100%',
};

const innerStyle = {
  display: 'table',
  margin: '0 auto',
};

const NotImplemented = () => (
  <div id="not-implemented" style={style}>
    <div style={innerStyle}>
      This functionality is not yet implemented.
    </div>
  </div>
);

export default NotImplemented;
