import React from 'react';
import Paper from 'material-ui/Paper';
import CreatePostForm from './CreatePostForm';
import Posts from './Posts';

const createPostPaperStyle = {
  padding: '15px',
};

/* This is the component that holds the posts and actions for the post.
 *    Similar to a 'wall'
 */
const Home = () => (
  <div id="board" className="board">
    <Paper zDepth={2} style={createPostPaperStyle}>
      <CreatePostForm />
    </Paper>
    <Posts />
  </div>
);

export default Home;
