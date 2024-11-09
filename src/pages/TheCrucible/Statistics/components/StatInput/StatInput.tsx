import { NumberInput } from 'react95';

import { useStats } from '../../../../../providers/StatisticsContext';
import { STAT_REMINDERS } from '../../../../../types/characterTypes';
import ReminderTooltip from '../../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import StatInputContainer  from '../../styles/StatInputContainer';

function StatInput({ statKey, handleChange }) {
	const { stats } = useStats();
	
	const labelText = (statKey?.charAt(0).toUpperCase() + statKey?.slice(1)) || "";
	
	return (
		<StatInputContainer>
			{/* Does the tooltip just need to wrap around a child? */}
			<ReminderTooltip 
				labelText={labelText} 
				reminderText={stats[statKey].reminderText} 
			/>
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