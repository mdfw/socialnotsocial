import React from 'react';

const TextSize = {
  EXLARGE: 0,
  LARGE: 1,
  MEDIUM: 2,
  SMALL: 3,
  selector: ['sns-text-field-exlg', 'sns-text-field-lg', 'sns-text-field-md', 'sns-text-field-sm'],
};

const TextField = (props) => {
  let inputDisabled = false;
  if (props.disabled) {
    inputDisabled = true;
  }
  let inputRequired = false;
  if (props.required) {
    inputRequired = true;
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
  let placeholder = '';
  if (props.hintText && props.hintText.length > 0) {
    placeholder = props.hintText;
  }
  const inputSelectors = ['sns-text-field-input', TextSize.selector[TextSize.LARGE]];
  if (props.textSize) {
    const newTextSize = TextSize.selector[props.textSize];
    if (newTextSize) {
      inputSelectors[1] = newTextSize;
    }
  }
  return (
    <div className="sns-text-field">
      <div className="sns-text-field-title-holder">
        <label aria-hidden="true" htmlFor={props.name}>{props.labelText}</label>
      </div>
      <div className="sns-text-field-input-holder">
        <input
          className={inputSelectors.join(' ')}
          name={props.name}
          disabled={inputDisabled}
          placeholder={placeholder}
          type={inputType}
          value={props.value}
          aria-label={props.labelText}
          aria-required={inputRequired}
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
  hintText: React.PropTypes.string,
  required: React.PropTypes.bool, // Default false
  disabled: React.PropTypes.bool, // Default false
  type: React.PropTypes.string, // Default 'text'
  value: React.PropTypes.string,
  textSize: React.PropTypes.oneOf([ // Defaults to TextSize.LARGE
    TextSize.EXLARGE,
    TextSize.LARGE,
    TextSize.MEDIUM,
    TextSize.SMALL,
  ]),
  errorText: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
};

export { TextField, TextSize };
