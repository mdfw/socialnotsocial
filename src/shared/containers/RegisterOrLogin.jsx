import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


class RegisterOrLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Register" value="a" >
          <RegisterForm />
        </Tab>
        <Tab label="login" value="b">
          <LoginForm />
        </Tab>
      </Tabs>
    );
  }
}


export default RegisterOrLogin;
