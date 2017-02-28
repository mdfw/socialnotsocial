import React from 'react';
import { Checkbox } from 'react-icheck';

import 'icheck/skins/all.css'; // or single skin css

// Checkbox with label

const CheckBox = props => (
  <Checkbox
    checkboxClass="icheckbox_square-blue"
    increaseArea="20%"
    label={props.label}
    disabled={props.disabled}
    setChecked={props.checked}
    onChange={props.handleChange}
  />
);
CheckBox.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  checked: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired,
};

export default CheckBox;
