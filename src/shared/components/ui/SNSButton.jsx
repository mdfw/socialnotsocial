import React from 'react';

const ButtonSize = {
  LARGE: 1,
  SMALL: 2,
  INLINE: 3,
  selector: ['sbtn-lg', 'sbtn-sm', 'sbtn-in', ];
};

const ButtonStyle = {
  PRIMARY: 1,
  PRIMARY_OUTLINE: 2,
  SECONDARY: 3,
  SECONDARY_OUTLINE: 4,
  WARNING: 5,
  WARNING_OUTLINE: 6,
  DANGER: 7,
  DANGER_OUTLINE: 8,
  LINK: 9,
  LINK_OUTLINE: 10,
  selector: ['sbtn-p', 'sbtn-po', 'sbtn-s', 'sbtn-so', 'sbtn-w', 'sbtn-wo', 'sbtn-d', 'sbtn-do', 'sbtn-l', 'sbtn-lo'];
};

function getStyleClass(style, size) {
  return ['sbtn', ButtonStyle.selector[style], ButtonSize.selector[size]].join(' ');
  
}

/*
  buttonStyle: [ButtonStyle ENUM] -- ButtonStyle.PRIMARY
  buttonSize: [ButtonSize ENUM] -- ButtonSize.large
  label: {string} -- submit
  onClick: func
  disabled: {bool} -- false
  type: {string} -- 'submit'
  */


const SNSButton = (props) => {
  let buttonStyle = ButtonStyle.PRIMARY;
  let buttonSize = ButtonSize.LARGE;
  if (typeof props.buttonStyle !== 'undefined') {
    buttonStyle = props.buttonStyle;
  }
  if (typeof props.buttonSize !== 'undefined') {
    buttonSize = props.buttonSize;
  }
  const theClass = getStyleClass(buttonStyle, buttonSize);

  let disabled = false;
  let type = 'submit';
  let label = 'Submit';
  if (typeof props.disabled !== 'undefined') {
    disabled = props.disabled;
  }
  if (typeof props.type !== 'undefined') {
    type = props.type;
  }
  if (typeof props.label !== 'undefined') {
    label = props.label;
  }
  return (
    <button
      className={theClass}
      disabled={disabled}
      type={type}
      onClick={props.onClick}
    >
      {label}
    </button>
  );
};
SNSButton.propTypes = {
  buttonStyle: React.PropTypes.oneOf([ // Defaults to ButtonStyle.PRIMARY
    ButtonStyle.PRIMARY,
    ButtonStyle.PRIMARY_OUTLINE,
    ButtonStyle.SECONDARY,
    ButtonStyle.SECONDARY_OUTLINE,
    ButtonStyle.WARNING,
    ButtonStyle.WARNING_OUTLINE,
    ButtonStyle.DANGER,
    ButtonStyle.DANGER_OUTLINE,
    ButtonStyle.LINK,
    ButtonStyle.LINK_OUTLINE,
  ]),
  buttonSize: React.PropTypes.oneOf([ // Defaults to ButtonSize.LARGE
    ButtonSize.LARGE,
    ButtonSize.SMALL,
    ButtonSize.INLINE,
  ]),
  disabled: React.PropTypes.bool, // Defaults to false
  type: React.PropTypes.string, // Defaults to 'submit'
  label: React.PropTypes.string,  // Defaults to 'Submit'
  onClick: React.PropTypes.func.isRequired,
};

export { SNSButton, ButtonStyle, ButtonSize };
