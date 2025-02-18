import { NumberInput } from 'react95';
import { useStats } from '../../../../../providers/StatisticsContext';
import ReminderTooltip from '../../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import StatInputContainer from '../../styles/StatInputContainer';

function StatInput({ statKey, handleChange }) {
	const { stats } = useStats();

	return (
		<StatInputContainer>
			<ReminderTooltip 
				labelText={stats[statKey].labelMsg}
				reminderText={stats[statKey].reminderMsg} 
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