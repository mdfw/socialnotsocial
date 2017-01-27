import React from 'react';
import Paper from 'material-ui/Paper';
import LoginForm from '../containers/LoginForm';


/* LoginPage wraps the sign up form in a nice page.
  */
const style = {
  padding: 20,
  textAlign: 'center',
  display: 'inline-block',
  marginTop: '20px',
  width: '600px',
};
const innerStyle = {
  display: 'table',
  margin: '0 auto',
};

const LoginPage = () => (
  <div id="loginPage">
    <div style={innerStyle}>
      <Paper zDepth={2} style={style}>
        <LoginForm inlineForm={false} />
      </Paper>
    </div>
  </div>
);

export default LoginPage;
