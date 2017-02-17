import React from 'react';
import moment from 'moment';
import Apprisals from './Apprisals';

function Post(props) {
  const createdTime = moment(props.createdAt).fromNow();
  const commentLines = [];

  /* eslint-disable array-callback-return */
  props.message.split('\n').map(function mapit(item, key) {
    commentLines.push(<span key={key}>{item}<br /></span>);
  });
  /* eslint-enable array-callback-return */

  return (
    <div className="post">
      <div className="post-content">{commentLines}</div>
      <hr
        style={{
          border: 0,
          height: '1px',
          marginTop: '10px',
          marginRight: '10px',
          marginLeft: '10px',
          backgroundColor: 'rgba(128, 128, 128, 0.33)',
        }}
      />
      <div className="post-bottom">
        <span className="post-time">Posted {createdTime}</span>
        <Apprisals apprisals={props.apprisals} />
      </div>
    </div>
  );
}

Post.propTypes = {
  message: React.PropTypes.string,
  createdAt: React.PropTypes.string,
  apprisals: React.PropTypes.array,
};


export default Post;
