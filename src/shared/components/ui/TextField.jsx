import React from 'react';

const TextField = (props) => {
  let inputDisabled = false;
  if (props.disabled) {
    inputDisabled = true;
  }
  const errorName = `${props.name}-error`;
  let hasErrors = false;
  if (props.errorText && props.errorText.length > 0) {
    hasErrors = true;
  }

  let inputType = 'text';
  if (props.type) {
    inputType = props.type;
  }
  return (
    <div className="sns-text-field">
      <div className="sns-text-field-title-holder">
        <label aria-hidden="true" htmlFor={props.name}>{props.labelText}</label>
      </div>
      <div className="sns-text-field-input-holder">
        <input
          className="sns-text-field-input"
          name={props.name}
          disabled={inputDisabled}
          type={inputType}
          value={props.value}
          aria-label={props.labelText}
          aria-required={true}
          aria-describedby={errorName}
          aria-invalid={hasErrors}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
        />
      </div>
      <div id={errorName} className="sns-text-field-error-text">{props.errorText}</div>
    </div>
  );
};

TextField.propTypes = {
  name: React.PropTypes.string.isRequired,
  labelText: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  type: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  errorText: React.PropTypes.string,
};

export default TextField;
