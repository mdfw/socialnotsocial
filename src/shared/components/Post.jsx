import React from 'react';
import Paper from 'material-ui/Paper';

const postContainerStyle = {
  padding: '10px',
};

function Post(props) {
  return (
    <div className="post">
      <Paper zDepth={1} style={postContainerStyle}>
        <div className="post-content">{ props.message }</div>
      </Paper>
    </div>
  );
}

Post.propTypes = {
  message: React.PropTypes.string,
};


export default Post;
