import { NumberInput } from 'react95';
import styled from 'styled-components';
import { useStats } from '../../../../../providers/StatisticsContext';
import StatTooltip from '../StatTooltip/StatTooltip';
import StatInputContainer  from '../../styles/StatInputContainer';

function StatInput({ statKey, handleChange }) {
	const { stats } = useStats();
	
	const labelText = (statKey?.charAt(0).toUpperCase() + statKey?.slice(1)) || "";
	
	return (
		<StatInputContainer>
			<StatTooltip statKey={statKey} labelText={labelText} />
			<NumberInput
				min={3}
				max={18}
				width='5rem'
				value={stats[statKey].score}
				onChange={handleChange(statKey)}
			/>
		</StatInputContainer>
	);
};


export default StatInput;