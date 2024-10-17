import { h } from 'preact';
import { NumberInput, Tooltip } from 'react95';
import styled from 'styled-components';
import { STAT_REMINDERS } from '../../../../../types/characterTypes';
import { useStats } from '../../../../../providers/StatisticsContext';

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
function StatInput({ statKey, handleChange }) {
	const { stats } = useStats();
	
	const labelText = (statKey?.charAt(0).toUpperCase() + statKey?.slice(1)) || "";
	
	return (
		<StatInputContainer>
			{/* jsx in the text param works fine, error seems wrong */}
			{/* @ts-ignore */}
			<Tooltip className='tooltip-content' text={
					<StyledToolTipInnerText>
						{STAT_REMINDERS[statKey]}
					</StyledToolTipInnerText>
				} enterDelay={100} leaveDelay={500}>
				<StyledLabel>
					{labelText}
				</StyledLabel>
			</Tooltip>
			<NumberInput
				min={3}
				max={18}
				width='5rem'
				value={stats[statKey].score}
				onChange={handleChange}
			/>
		</StatInputContainer>
	);
};


export default StatInput;