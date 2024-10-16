import { useStats } from '../../../../../providers/StatisticsContext';
import StatInput from '../StatInput/StatInput';
import { Statistics } from '../../../../../types/characterTypes';
function ManualInputStats() {
    const { stats, setStats } = useStats();

    // need to refactor this onChange, need to block raising values if points <=0
    const handleChange = (statKey: keyof Statistics)=> (value: number) => {
        const updatedStat = { ...stats[statKey], score: value, x5: value * 5 };
        setStats({ ...stats, [statKey]: updatedStat });
    };

    const renderStatInputs = () => {
        return Object.keys(stats).map((statKey) => {
            return (
                <StatInput statKey={statKey}  onChange={handleChange} />
            )
        });
    };

    return(
        <div>
            {renderStatInputs()}
        </div>
    );
}

export default ManualInputStats;