import React from 'react';
import { Label, Input } from './styledCheckbox';

const Checkbox = ({
	type = 'checkbox',
	name,
	checked = false,
	onChange,
	label,
}) => {
	return (
		<Label key={label}>
			{label}
			<Input type={type} name={name} checked={checked} onChange={onChange} />
		</Label>
	);
};
export default Checkbox;
