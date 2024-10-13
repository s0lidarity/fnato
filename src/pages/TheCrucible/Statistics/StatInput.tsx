import { h } from 'preact';
import { NumberInput, Tooltip } from 'react95';
import styled from 'styled-components';
import { STAT_REMINDERS } from '../../../types/characterTypes';

const StyledToolTipInnerText = styled.span`
	padding: 0.5rem;
	color: ${({ theme }) => theme.materialDark};
`;

function StatInput({ label, value, onChange }) {
	return (
		<div>
			<Tooltip className='tooltip-content' text={
					<StyledToolTipInnerText>
						{STAT_REMINDERS[label.toLowerCase()]}
					</StyledToolTipInnerText>
				} enterDelay={100} leaveDelay={500}>
				<label>
					{label}
				</label>
			</Tooltip>
			<NumberInput
				min={3}
				max={18}
				width='5rem'
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};


export default StatInput;