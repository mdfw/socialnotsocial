import React from 'react';
import moment from 'moment';
import Apprisals from './Apprisals';
import AppriseMenu from '../containers/AppriseMenu';

const shareButtonStyle = {
  border: '0.5px solid rgba(204, 204, 204, 0.54)',
  padding: '1px 10px',
  fontSize: '12px',
  color: 'grey',
  borderRadius: '3px',
  marginLeft: '5px',
  marginRight: '8px',
  backgroundColor: 'white',
  verticalAlign: 'middle',
  outline: '0px',
  float: 'right',
};

class Post extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
    this.state = { showMore: false };
    this.switchMenu = this.switchMenu.bind(this);
  }
  switchMenu() {
    console.log('Switching menu');
    this.setState({
      showMore: !this.state.showMore,
    });
  }

  render() {
    const createdTime = moment(this.props.createdAt).fromNow();
    const commentLines = [];

    /* eslint-disable array-callback-return */
    this.props.message.split('\n').map(function mapit(item, key) {
      commentLines.push(<span key={key}>{item}<br /></span>);
    });
    /* eslint-enable array-callback-return */

    let share = null;
    if (this.state.showMore) {
      share = <AppriseMenu apprisals={this.props.apprisals} postId={this.props.postId} />;
    }
    return (
      <div className="post">
        <div className="post-content">{commentLines}</div>
        <div className="post-bottom">
          <span className="post-time">Posted {createdTime}</span>
          <Apprisals apprisals={this.props.apprisals} />
          <button onClick={this.switchMenu} style={shareButtonStyle}>Share</button>
          {share}

        </div>
      </div>
    );
  }
}

Post.propTypes = {
  message: React.PropTypes.string,
  createdAt: React.PropTypes.string,
  apprisals: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  postId: React.PropTypes.string.isRequired,
};


export default Post;
