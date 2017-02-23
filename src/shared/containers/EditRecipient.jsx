import { connect } from 'react-redux';
import React from 'react';
import EditRecipientForm from '../components/EditRecipientForm';
import { newRecipient, updateRecipient } from '../actions/recipients';
import { formUpdate } from '../actions/forms';

/*
  id:
  type: email, text, post, facebook
  status; active, validating, removed, bouncing, unsubscribed
  displayName:
  email:
  canRespond:
  validatedAt:
  validated:
  unsubscribedAt:
  unsubscribedReason:
  */

class EditRecipient extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }
  componentWillMount() {
    console.log(`Setting up: ${this.props.formId} editType: ${this.props.editType}`);
    if (this.props.editType === 'new') {
      this.props.dispatch(
        formUpdate(
          this.props.formId,
          {
            displayName: '',
            email: '',
            canRespond: true,
            fieldsTouched: [],
            fieldsExited: [],
          },
        ),
      );
    } else if (this.props.editType === 'edit') {
      this.props.dispatch(
        formUpdate(
          this.props.formId,
          {
            displayName: this.props.recipientEditing.name,
            email: this.props.recipientEditing.email,
            canRespond: this.props.recipientEditing.canRespond,
            fieldsTouched: [],
            fieldsExited: [],
          },
        ),
      );
    }
  }
  handleSubmit() {
    if (this.props.editType === 'new') {
      this.props.dispatch(
        newRecipient(
          this.props.displayName,
          this.props.email,
          this.props.formId,
        ),
      );
    } else if (this.props.editType === 'edit') {
      this.props.dispatch(
        updateRecipient(
          this.props.recipientEditing.id,
          this.props.displayName,
          this.props.email,
          this.props.formId,
        ),
      );
    }
  }
  handleChange(fields) {
    this.props.dispatch(formUpdate(this.props.formId, fields));
  }
  handleFocus(fieldName) {
    if (this.props.fieldsTouched.indexOf(fieldName) === -1) {
      const newTouched = this.props.fieldsTouched.concat(fieldName);
      this.props.dispatch(formUpdate(this.props.formId, { fieldsTouched: newTouched }));
    }
  }
  handleBlur(fieldName) {
    if (this.props.fieldsExited.indexOf(fieldName) === -1) {
      const newExited = this.props.fieldsExited.concat(fieldName);
      this.props.dispatch(formUpdate(this.props.formId, { fieldsExited: newExited }));
    }
  }
  render() {
    let errors = {};
    let submitting = false;
    if (this.props.submitting) {
      submitting = this.props.submitting;
    }
    let displayNameValue = '';
    if (this.props.displayName) {
      displayNameValue = this.props.displayName;
    }
    let emailValue = '';
    if (this.props.email) {
      emailValue = this.props.email;
    }
    let canRespondValue = true;
    if (this.props.canRespond) {
      canRespondValue = this.props.canRespond;
    }
    return (
      <EditRecipientForm
        handleSubmit={this.handleSubmit}
        handleBlur={this.handleBlur}
        handleFocus={this.handleFocus}
        handleChange={this.handleChange}
        submitting={submitting}
        displayNameValue={displayNameValue}
        emailValue={emailValue}
        canRespondValue={canRespondValue}
        errors={errors}
      />
    );
  }
}

EditRecipient.propTypes = {
  formId: React.PropTypes.string.isRequired,
  editType: React.PropTypes.oneOf(['new', 'edit']).isRequired,
  displayName: React.PropTypes.string,
  recipientType: React.PropTypes.string,
  email: React.PropTypes.string,
  canRespond: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  fieldsTouched: React.PropTypes.arrayOf(React.PropTypes.string),
  fieldsExited: React.PropTypes.arrayOf(React.PropTypes.string),
  recipientEditing: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    email: React.PropTypes.string,
    canRespond: React.PropTypes.bool.isRequired,
    validated: React.PropTypes.bool,
    validatedAt: React.PropTypes.string,
    createdAt: React.PropTypes.string.isRequired,
    updatedAt: React.PropTypes.string.isRequired,
    unsubscribedAt: React.PropTypes.string,
    unsubscribedReason: React.PropTypes.string,
  }),
  dispatch: React.PropTypes.func.isRequired,
};


/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownProps) {
  const ourFormId = ownProps.formId;
  const curForm = state.forms[ourFormId];
  if (!curForm) {
    return {}
  }
  return {
    displayName: state.forms[ourFormId].displayName,
    recipientType: state.forms[ourFormId].recipientType,
    email: state.forms[ourFormId].email,
    canRespond: state.forms[ourFormId].canRespond,
    submitting: state.forms[ourFormId].submitting,
    fieldsTouched: state.forms[ourFormId].fieldsTouched,
    fieldsExited: state.forms[ourFormId].fieldsExited,
  };
};

const Container = connect(mapStateToProps)(EditRecipient);

export default Container;
