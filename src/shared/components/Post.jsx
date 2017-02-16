import React from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

function Post(props) {
  const createdTime = moment(props.createdAt).fromNow();
  const commentLines = [];
  props.message.split('\n').map(function mapit(item, key) {
    commentLines.push(<span key={key}>{item}<br /></span>);
  });

  return (
    <div className="post">
      <div className="post-content">{commentLines}</div>
      <div className="post-time">{createdTime}</div>
    </div>
  );
}

Post.propTypes = {
  message: React.PropTypes.string,
  createdAt: React.PropTypes.string,
};


export default Post;
