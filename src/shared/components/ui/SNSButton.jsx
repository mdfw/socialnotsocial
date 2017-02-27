import React from 'react';

const ButtonSize = {
  LARGE: 0,
  SMALL: 1,
  INLINE: 2,
  selector: ['sbtn-lg', 'sbtn-sm', 'sbtn-in'],
};

const ButtonStyle = {
  PRIMARY: 0,
  PRIMARY_OUTLINE: 1,
  SECONDARY: 2,
  SECONDARY_OUTLINE: 3,
  WARNING: 4,
  WARNING_OUTLINE: 5,
  DANGER: 6,
  DANGER_OUTLINE: 7,
  LINK: 8,
  selector: ['sbtn-p', 'sbtn-po', 'sbtn-s', 'sbtn-so', 'sbtn-w', 'sbtn-wo', 'sbtn-d', 'sbtn-do', 'sbtn-l'],
};

function getStyleClass(style, size) {
  return ['sbtn', ButtonStyle.selector[style], ButtonSize.selector[size]].join(' ');
}

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
  let showSpinner = false;
  if (typeof props.disabled !== 'undefined') {
    disabled = props.disabled;
  }
  if (typeof props.type !== 'undefined') {
    type = props.type;
  }
  if (typeof props.label !== 'undefined') {
    label = props.label;
  }
  if (typeof props.showSpinner !== 'undefined') {
    showSpinner = props.showSpinner;
  }
  if (showSpinner && buttonStyle !== ButtonStyle.LINK) {
    label = (
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    );
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
  showSpinner: React.PropTypes.bool, // Defaults to false
};

export { SNSButton, ButtonStyle, ButtonSize };
