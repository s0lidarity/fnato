import { NumberInput } from 'react95';
import { t } from '@lingui/core/macro';

import { useStats } from '../../../../../providers/StatisticsContext';
import ReminderTooltip from '../../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import StatInputContainer  from '../../styles/StatInputContainer';

function StatInput({ statKey, handleChange }) {
	const { stats } = useStats();
	const labelText = (`${statKey?.charAt(0).toUpperCase() + statKey?.slice(1)}`) || "";
	
	return (
		<StatInputContainer>
			<ReminderTooltip 
				labelText={t`${labelText}`} 
				reminderText={t`${stats[statKey].reminderText}`} 
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