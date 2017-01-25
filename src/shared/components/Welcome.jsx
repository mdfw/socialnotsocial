import React from 'react';
import Register from '../containers/RegisterForm';
import Login from '../containers/LoginForm';

const Welcome = function Welcome() {
  return (
    <div>
      Welcome to Social, not social
      <Login />
    </div>
  );
};

module.exports = Welcome;
