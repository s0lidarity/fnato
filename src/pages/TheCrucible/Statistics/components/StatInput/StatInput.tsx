import { NumberInput } from 'react95';

import { useStats } from '../../../../../providers/StatisticsContext';
import ReminderTooltip from '../../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import StatInputContainer from '../../styles/StatInputContainer';

function StatInput({ statKey, handleChange }) {
	const { stats } = useStats();
	const labelText = (statKey?.charAt(0).toUpperCase() + statKey?.slice(1)) || "";
	const reminderText = stats[statKey].reminderText || "";
	console.log("statInput labelText", labelText);
	console.log("statInput reminderText", reminderText);
	
	return (
		<StatInputContainer>
			<ReminderTooltip 
				labelText={labelText}
				reminderText={reminderText} 
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