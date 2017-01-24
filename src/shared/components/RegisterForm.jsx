import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { appraiseEmail,
  appraiseDisplayName,
  appraisePassword,
} from '../helpers/appraise';

const validate = (values) => {
  const errors = {};
  const displayNameErrors = appraiseDisplayName(values.displayName);
  if (displayNameErrors.length > 0) {
    errors.displayName = displayNameErrors.join(' ');
  }

  const emailErrors = appraiseEmail(values.email);
  if (emailErrors.length > 0) {
    errors.email = emailErrors.join(' ');
  }

  const passwordErrors = appraisePassword(values.password);
  if (passwordErrors.length > 0) {
    errors.password = passwordErrors.join(' ');
  }
  return errors;
};

const warn = (values) => {
  const warnings = {};
  if (values.displayName.length < 5) {
    warnings.displayName = 'Your name is short. It\'s used when informing others of new posts.';
  }
  return warnings;
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

renderField.propTypes = {
  input: React.PropTypes.String,
  label: React.PropTypes.String,
  type: React.PropTypes.String,
  meta: React.PropTypes.Object,
};


const RegisterForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="displayName" type="text" component={renderField} label="Your name" />
      <Field name="email" type="email" component={renderField} label="Your email address" />
      <Field name="password" type="password" component={renderField} label="A solid password" />
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
      </div>
    </form>
  );
};

RegisterForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  reset: React.PropTypes.bool,
  submitting: React.propTypes.bool,
};

export default reduxForm({
  form: 'registerForm',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn,                    // <--- warning function given to redux-form
})(RegisterForm);
