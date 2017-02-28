import { connect } from 'react-redux';
import React from 'react';
import { fetchPosts } from '../actions/posts';
import { fetchRecipients } from '../actions/recipients';
import Post from '../components/Post';

/* Renders if there are no posts */
const noPostsStyle = {
  textAlign: 'center',
  fontSize: '20px',
  color: '#4376a3',
  marginTop: '30px',
};

const NoPosts = () => (
  <div id="noPosts" style={noPostsStyle}>
    There are no posts to show. Yet.
  </div>
);

/* Renders a list of posts */
// Need delete/edit
const AllPosts = ({ posts }) => (
  <div>
    {posts.map(post => (
      <Post
        message={post.message}
        createdAt={post.created_at}
        apprisals={post.Apprisals}
        key={post.id}
        postId={post.id}
      />
    ))}
  </div>
);
AllPosts.propTypes = {
  posts: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

/* Main container that manages showing of posts */
class PostsContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRecipients());
    this.props.dispatch(fetchPosts());
  }
  render() {
    if (this.props.posts.length === 0) {
      return (<NoPosts />);
    }
    return (
      <AllPosts posts={this.props.posts} />
    );
  }
}

PostsContainer.propTypes = {
  posts: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  dispatch: React.PropTypes.func,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
  };
};

const Container = connect(mapStateToProps)(PostsContainer);

export default Container;
