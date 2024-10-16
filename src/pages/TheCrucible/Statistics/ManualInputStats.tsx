import { useStats } from '../../../providers/StatisticsContext';
import StatInput from './StatInput';
import { Statistics } from '../../../types/characterTypes';
function ManualInputStats() {
    const { stats, setStats } = useStats();

    // need to refactor this onChange, need to block raising values if points <=0
    const onChange = (statKey: keyof Statistics, stats: Statistics, setStats: (stats: Statistics) => void) => (value: number) => {
        const updatedStat = { ...stats[statKey], score: value, x5: value * 5 };
        setStats({ ...stats, [statKey]: updatedStat });
    };

    return(
        <div>
            <StatInput label="Strength" value={stats.strength.score} onChange={onChange('strength', stats, setStats)} />
            <StatInput label="Constitution" value={stats.constitution.score} onChange={onChange('constitution', stats, setStats)} />
            <StatInput label="Dexterity" value={stats.dexterity.score} onChange={onChange('dexterity', stats, setStats)} />
            <StatInput label="Intelligence" value={stats.intelligence.score} onChange={onChange('intelligence', stats, setStats)} />
            <StatInput label="Power" value={stats.power.score} onChange={onChange('power', stats, setStats)} />
            <StatInput label="Charisma" value={stats.charisma.score} onChange={onChange('charisma', stats, setStats)} />
        </div>
    );
}

export default ManualInputStats;