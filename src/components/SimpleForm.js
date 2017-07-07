import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SimpleForm = ({label, value, hintText, errorText, onChange, onClick}) => (
	<div className="center m1">
	  <TextField hintText={hintText}
	  value={value}
	  errorText={errorText}
	  onChange={onChange}>
	  </TextField>
	  <RaisedButton label={label} onClick={onClick}>
	  </RaisedButton>
	</div>
 );

SimpleForm.defaultName = 'SimpleForm';
SimpleForm.propTypes = {
	hintText: PropTypes.string, 
	errorText: PropTypes.string,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	label: PropTypes.string,
	value: PropTypes.string,
  style: PropTypes.object,
}

export default SimpleForm;
