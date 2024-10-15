import { h } from 'preact';
import { NumberInput, Tooltip } from 'react95';
import styled from 'styled-components';
import { STAT_REMINDERS } from '../../../types/characterTypes';

const StyledToolTipInnerText = styled.span`
	padding: 0.5rem;
	color: ${({ theme }) => theme.materialDark};
`;

const StatInputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
	border-color: ${({ theme }) => theme.borderDark};
	border-style: solid;
	border-width: 0.25rem;
`;

const StyledLabel = styled.label`
	margin-left: 0.5rem;
`;

// AJS, might need to disable keyboard input for this component
function StatInput({ label, value, onChange }) {
	return (
		<StatInputContainer>
			{/* jsx in the text param works fine, error seems wrong */}
			{/* @ts-ignore */}
			<Tooltip className='tooltip-content' text={
					<StyledToolTipInnerText>
						{STAT_REMINDERS[label.toLowerCase()]}
					</StyledToolTipInnerText>
				} enterDelay={100} leaveDelay={500}>
				<StyledLabel>
					{label}
				</StyledLabel>
			</Tooltip>
			<NumberInput
				min={3}
				max={18}
				width='5rem'
				value={value}
				onChange={onChange}
			/>
		</StatInputContainer>
	);
};


export default StatInput;