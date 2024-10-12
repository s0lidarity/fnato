import { h } from 'preact';
import { NumberInput, Tooltip } from 'react95';
import styled from 'styled-components';
import { STAT_REMINDERS } from '../../../types/characterTypes';


// AJS apply the styling to the span inside of the text within the tooltip instead of the tooltip itself
const StyledTooltip = styled(Tooltip)`
	& .tooltip-content {
		background-color: ${({ theme }) => theme.canvas};
		color: ${({ theme }) => theme.canvasText};
		border: 1px solid ${({ theme }) => theme.borderDark};
		padding: 0.5rem;
		font-size: 1rem;
	}
`;

// style the NumberInput, it's too long

function StatInput({ label, value, onChange }) {
	return (
		<div>
			<StyledTooltip className='tooltip-content' text={
					<span style={{color: 'black'}}>
						{STAT_REMINDERS[label.toLowerCase()]}
					</span>
				} enterDelay={100} leaveDelay={500}>
				<label>
					{label}
				</label>
			</StyledTooltip>
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