import React from 'react';
import { Input } from './styledCheckbox';

const Checkbox = ({
	type = 'checkbox',
	name,
	checked = false,
	onChange,
	onClick,
}) => {
	return (
		<Input type={type} name={name} checked={checked} onChange={onChange} />
	);
};
export default Checkbox;
