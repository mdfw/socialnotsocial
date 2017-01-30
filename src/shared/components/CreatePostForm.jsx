import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextareaAutosize from 'react-autosize-textarea';
import Settings from '../settings';

/* SubmitProgress shows a spinner while we wait for account creation.
  */
class SubmitProgress extends React.Component { // eslint-disable-line react/no-multi-comp
  render() {
    if (this.props.submitting) {
      return <CircularProgress mode="indeterminate" />;
    }
    return null;
  }
}
SubmitProgress.propTypes = {
  submitting: React.PropTypes.bool,
};

/* Shows account creation errors.
  */
class SubmitErrorDisplay extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.handleErrorAck();
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Try again"
        primary={true} // eslint-disable-line react/jsx-boolean-value
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Error"
          actions={actions}
          modal={false} // eslint-disable-line react/jsx-boolean-value
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.errorMessage}
        </Dialog>
      </div>
    );
  }
}
SubmitErrorDisplay.propTypes = {
  handleErrorAck: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string.isRequired,
};

/* button style for the submit button below */
const submitButtonStyle = {
  margin: 12,
};

/* Main registration form component */
class CreatePostForm extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = { fieldActive: false };
  }
  onChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.props.handleChange({
      [name]: value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();
  }
  onBlur(e) {
    const name = e.target.name;
    this.setState({ fieldActive: false });
    this.props.handleBlur(name);
  }
  onFocus(e) {
    const name = e.target.name;
    this.setState({ fieldActive: true });
    this.props.handleFocus(name);
  }
  render() {
    const {
      submitting,
      errors,
      messageValue,
      subjectValue,
    } = this.props;
    let errorDialog = null;
    if (this.props.errors.submitError) {
      errorDialog = (
        <SubmitErrorDisplay
          errorMessage={this.props.errors.submitError}
          handleErrorAck={this.props.handleErrorAck}
        />
      );
    }
    const createPostPaperStyle = {
      padding: '15px',
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      marginBottom: '15px',
    };

    if (this.state.fieldActive) {
      createPostPaperStyle.boxShadow = '#459691 0px 3px 10px, #d9ecfc 0px 3px 10px';
    }

    const textAreaStyle = {
      fontFamily: 'Open Sans',
      fontSize: '18px',
      width: '100%',
      borderColor: 'lightGrey',
      borderTopColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      resize: 'none',
      outlineWidth: '1px',
      outlineColor: '#4798ad',
    };

    const subjectStyle = {
      borderWidth: '1px',
      borderColor: 'lightGrey',
      borderTopColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      fontFamily: 'Open Sans',
      fontSize: '14px',
      outlineWidth: '1px',
      outlineColor: '#4798ad',
      width: '100%',
    };

    const subjectLabelStyle = {
      fontFamily: 'Open Sans',
      fontSize: '14px',
      color: 'gray',
      marginTop: '4px',
      float: 'left',
    };

    const subjectAreaStyle = {
      overflow: 'hidden',
      width: '100%',
    };

    const subjectInputContainerStyle = {
      display: 'block',
      overflow: 'hidden',
      padding: '0 4px 0 6px',
    };

    return (
      <div style={createPostPaperStyle}>
        {errorDialog}
        <form onSubmit={this.onSubmit}>
          <div>
            <TextareaAutosize
              placeholder="What do you want to share?"
              maxRows={3}
              rows={2}
              disabled={submitting}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              name="message"
              value={messageValue}
              maxLength={Settings.postMaxCharacters}
              style={textAreaStyle}
              aria-label="Message content"
            />
          </div>
          <div style={subjectAreaStyle}>
            <label htmlFor="subject" style={subjectLabelStyle}>Subject</label>
            <span style={subjectInputContainerStyle}>
              <input
                type="text"
                name="subject"
                placeholder="(optional)"
                value={subjectValue}
                disabled={submitting}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                style={subjectStyle}
              />
            </span>
          </div>
          <div>
            <RaisedButton
              label="Post"
              primary={true} // eslint-disable-line react/jsx-boolean-value
              style={submitButtonStyle}
              disabled={submitting || !errors.formReady}
              type="submit"
            />
          </div>
        </form>
        <SubmitProgress submitting={submitting} />
      </div>
    );
  }
}

CreatePostForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  handleBlur: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleErrorAck: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool,
  errors: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  messageValue: React.PropTypes.string,
  subjectValue: React.PropTypes.string,
};

export default CreatePostForm;
