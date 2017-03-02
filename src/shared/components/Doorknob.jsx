import React from 'react';
import cookie from 'react-cookie';
import RegisterForm from '../containers/RegisterForm';
import LoginForm from '../containers/LoginForm';
import { COOKIE_NAME_HAS_LOGGED_IN } from '../../globalConstants';

const FORM_REGISTER = 1;
const FORM_LOGIN = 2;

const Login = ({ onClick }) => (
  <div className="doorknob-form-holder">
    <LoginForm />
    <hr
      style={{
        border: 0,
        height: '0.5px',
        marginTop: '10px',
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))',
      }}
    />
    <span className="doorknob-switch-prompt">
      Need an account? <button onClick={onClick}>Sign Up</button>
    </span>
  </div>
);
Login.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

const Register = ({ onClick }) => (
  <div className="doorknob-form-holder">
    <RegisterForm />
    <hr
      style={{
        border: 0,
        height: '0.5px',
        marginTop: '10px',
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))',
      }}
    />
    <span className="doorknob-switch-prompt">
      Already have an account? <button onClick={onClick}>Login</button>
    </span>
  </div>
);
Register.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

class DoorKnob extends React.Component {
  constructor(props) {
    super(props);
    let formId = FORM_REGISTER;
    if (cookie.load(COOKIE_NAME_HAS_LOGGED_IN) === 'y') {
      formId = FORM_LOGIN;
    }
    this.state = {
      form: formId,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    let formId = FORM_REGISTER;
    if (this.state.form === FORM_REGISTER) {
      formId = FORM_LOGIN;
    }
    this.setState({
      form: formId,
    });
  }
  render() {
    let whichForm = <Register onClick={this.onClick} />;
    if (this.state.form === FORM_LOGIN) {
      whichForm = <Login onClick={this.onClick} />;
    }
    return (
      <div className="doorknob">
        {whichForm}
      </div>
    );
  }
}

module.exports = DoorKnob;
