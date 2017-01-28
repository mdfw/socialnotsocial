import React from 'react';
import Paper from 'material-ui/Paper';

function Post(props) {
  return (
    <div className="post">
      <Paper zDepth={2}>
        { props.message }
        { props.subject }
      </Paper>
    </div>
  );
}

Post.propTypes = {
  message: React.PropTypes.string,
  subject: React.PropTypes.string,
};


export default Post;
