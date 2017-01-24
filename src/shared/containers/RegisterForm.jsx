import { connect } from 'react-redux';
import React from 'react';
import { submitNewAccount } from '../actions/account';
import RegisterForm from '../components/RegisterForm';

class RegisterFormContainer extends React.Component {
  handleSubmit(values) {
    this.dispatch(submitNewAccount(values.displayName, values.email, values.password));
  }
  handleReset() {
    console.log('reset');
  }
  render() {
    console.log('container props');
    console.dir(this.props);
    let submitting = false;
    return (
        <RegisterForm
        handleSubmit={values => this.handleSubmit(values)}
        reset={() => this.handleReset()}
        pristine={true}
        submitting={submitting}
      />
    );
  }
}

RegisterFormContainer.propTypes = {
  submitting: React.PropTypes.bool,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    submitting: state.account.submitting,
  };
};

const Container = connect(mapStateToProps)(RegisterFormContainer);

export default Container;


/* 
        <RegisterForm
        handleSubmit={values => this.handleSubmit(values)}
        submitting={this.props.submitting}
      />

*/