import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import Settings from '../settings';
import { SNSButton } from './ui/SNSButton';

/* button style for the submit button below */
const submitButtonStyle = {
  margin: 12,
  color: 'white',
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
    } = this.props;
    let errorDialog = null;
    if (this.props.errors.submitError) {
      errorDialog = (
        <div className="post-submit-error">
          {this.props.errors.submitError}
        </div>
      );
    }
    const createPostPaperStyle = {
      padding: '15px',
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 1px 5px, rgba(0, 0, 0, 0.227451) 0px 1px 5px',
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      backgroundColor: 'white',
      marginBottom: '15px',
    };

    if (this.state.fieldActive) {
      createPostPaperStyle.boxShadow = '#459691 0px 1px 5px, #d9ecfc 0px 1px 5px';
    }

    const textAreaStyle = {
      fontFamily: 'Open Sans',
      fontSize: '18px',
      width: '100%',
      borderColor: 'transparent',
      resize: 'none',
      outlineWidth: '1px',
      outlineColor: '#4798ad',
    };

    return (
      <div style={createPostPaperStyle}>
        {errorDialog}
        <form onSubmit={this.onSubmit}>
          <div>
            <TextareaAutosize
              placeholder="What do you want to share?"
              maxRows={500}
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
          <div>
            <label htmlFor="image-uploader" className="image-upload-button-label">
              <i className="image-upload-button-overlay" /> + Add image (disabled)
              <input
                type="file"
                id="image-uploader"
                className="image-upload-button"
                disabled={true}
              />
            </label>
          </div>
          <div>
            <SNSButton
              label="Post"
              style={submitButtonStyle}
              showSpinner={submitting}
              disabled={submitting || !errors.formReady}
              type="submit"
              onClick={this.onSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}

CreatePostForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  handleBlur: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool,
  errors: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  messageValue: React.PropTypes.string,
};

export default CreatePostForm;
