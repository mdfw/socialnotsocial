import React from 'react';
import Paper from 'material-ui/Paper';
import RegisterForm from '../containers/RegisterForm';

/* RegisterPage wraps the sign up form in a nice page.
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

const RegisterPage = () => (
  <div id="registerPage">
    <div style={innerStyle}>
      <Paper zDepth={2} style={style}>
        <RegisterForm />
      </Paper>
    </div>
  </div>
);

export default RegisterPage;
