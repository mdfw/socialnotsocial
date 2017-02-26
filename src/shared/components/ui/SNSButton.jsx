import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

/*
  buttonStyle: [primary, secondary, warning, danger, link] -- primary
  size: [large, small, inline] -- large
  label: {string} -- submit
  onClick: func
  disabled: {bool} -- false
  className: {object} -- null
  color: {string} -- color from type
  backgroundColor: {string} -- color from type
  hoverColor: {string} -- color from type
  type: {string} -- 'submit'
  style: {object} -- style from buttonStyle
  
  */
const SNSButton = (props) => {
  const handleClick = function handleButtonClick(e) {
    console.log('SNSButton: Handling click in button');
    console.dir(props);
    e.preventDefault();
    if (props.onClick) {
     console.log('SNSButton: Sending on to onClick');
     props.onClick();
    }
  };
  let primary = true;
  let disabled = false;
  let type = 'submit';
  let label = 'Submit';
  let inLine = false;
  if (typeof props.primary !== 'undefined') {
    primary = props.primary;
  }
  if (typeof props.disabled !== 'undefined') {
    disabled = props.disabled;
  }
  if (typeof props.type !== 'undefined') {
    type = props.type;
  }
  if (typeof props.label !== 'undefined') {
    label = props.label;
  }
  if (typeof props.inLine !== 'undefined') {
    inLine = props.inLine;
  }
  if (inLine) {
    return (
      <FlatButton
        label={label}
        primary={primary}
        disabled={disabled}
        type={type}
        onClick={props.onClick}
      />
    );
  }
  return (
    <RaisedButton
      label={label}
      primary={primary}
      disabled={disabled}
      type={type}
      onClick={props.onClick}
    />
  );
};
SNSButton.propTypes = {
  primary: React.PropTypes.bool, // Defaults to true
  disabled: React.PropTypes.bool, // Defaults to false
  type: React.PropTypes.string, // Defaults to 'submit'
  label: React.PropTypes.string,  // Defaults to 'Submit'
  onClick: React.PropTypes.func,
  inLine: React.PropTypes.bool, // Defaults to false
};

export default SNSButton;
