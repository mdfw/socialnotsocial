import React from 'react';
import Paper from 'material-ui/Paper';
import CreatePostForm from './CreatePostForm';
import Posts from './Posts';

/* This is the baseline for all the activity that will take place. Similar to a 'wall' */
const Home = () => (
  <div id="board">
    <Paper zDepth={2}>
      <CreatePostForm />
    </Paper>
    <Posts />
  </div>
);

export default Home;
