import { connect } from 'react-redux';
import React from 'react';
import { submitNewAccount } from '../actions/account';
// import RegisterForm from '../components/RegisterForm';

class RegisterFormContainer extends React.Component {
  handleSubmit(values) {
    this.dispatch(submitNewAccount(values.displayName, values.email, values.password));
  }
  render() {
    console.log('container props');
    console.dir(this.props);
    return (
      <div>
      Our form here.
      </div>
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