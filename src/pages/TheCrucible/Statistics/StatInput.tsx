import { h } from 'preact';
import { NumberInput } from 'react95';

function StatInput({ label, value, onChange }) {
	return (
		<div>
			<label>{label}</label>
			<NumberInput
				min={3}
				max={18}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default StatInput;