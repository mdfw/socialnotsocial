import React from 'react';
import Toggle from 'material-ui/Toggle';

const ToggleSwitch = props => (
  <Toggle
    label={props.label}
    labelPosition="right"
    defaultToggled={props.on}
    onToggle={props.onToggle}
  />
);
ToggleSwitch.propTypes = {
  on: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired,
  onToggle: React.PropTypes.func.isRequired,
};

export default ToggleSwitch;
