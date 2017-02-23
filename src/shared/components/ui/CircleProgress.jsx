import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const SubmitProgress = (props) => {
  if (props.running) {
    return <CircularProgress mode="indeterminate" />;
  }
  return null;
};
SubmitProgress.propTypes = {
  running: React.PropTypes.bool,
};

export default SubmitProgress;
