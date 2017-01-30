import React from 'react';
import CreatePostForm from './CreatePostForm';
import Posts from './Posts';

/* This is the component that holds the posts and actions for the post.
 *    Similar to a 'wall'
 */
const Home = () => (
  <div id="board" className="board">
    <CreatePostForm />
    <Posts />
  </div>
);

export default Home;
