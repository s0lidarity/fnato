import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import { Button } from 'react95';   
import { Trans } from '@lingui/react/macro';

import { useStats } from '../../../../../providers/StatisticsContext';
import StatInput from '../StatInput/StatInput';
import { Statistics } from '../../../../../types/characterTypes';
import { StatsConfigOptions } from '../../../../../types/componentTypes';
import PointsCounter from '../../../../../components/PointsCounter/PointsCounter';

const ButtonContainer = styled.div.attrs<any>({
    'data-testid': 'button-container',
    'data-component': 'ManualInputStats/ButtonContainer'
})`
    display: flex;
    justify-content: space-evenly;
    margin-top: 0.75rem;
    align-items: center;
`;

interface ManualInputStatsProps {
    config: StatsConfigOptions;
}

const DEFAULT_POINTS = 72;

function ManualInputStats( { config }: ManualInputStatsProps)  {
    const { resetStats, stats, setStats } = useStats();
    const [points, setPoints] = useState(DEFAULT_POINTS-(6*10));
    const [showNoPointsWarning, setShowNoPointsWarning] = useState(false);

    const handleChange = (statKey: keyof Statistics)=> (value: number) => {
        const currentValue = stats[statKey].score;
        const difference = value - currentValue;

        if(config === StatsConfigOptions.PointBuy) {
            if(difference > points){
                value = currentValue + points;
            }
            
            if(difference > 0 && points <= 0){
                setShowNoPointsWarning(true);
                setTimeout(() => setShowNoPointsWarning(false), 500);
                return;
            }
        }
        
        const updatedStat = { ...stats[statKey], score: value, x5: value * 5 };
        setStats({ ...stats, [statKey]: updatedStat });
    };

    const calculateRemainingPoints = (stats: Statistics) => {
        let total = 0;
        for (const stat in stats) {
            if (stats.hasOwnProperty(stat)) {
                total += stats[stat as keyof Statistics].score;
            }
        }
        return (DEFAULT_POINTS - total);
    };

    useEffect(() => {
        setPoints(calculateRemainingPoints(stats));
    }, [stats, calculateRemainingPoints]);

    const renderStatInputs = () => {
        return Object.keys(stats).map((statKey) => {
            return (
                <StatInput
                    key={statKey}
                    statKey={statKey}
                    handleChange={handleChange}
                />
            )
        });
    };

    return(
        <div>
            {renderStatInputs()}
            <ButtonContainer>
                <Button onClick={resetStats}><Trans>Reset Statistics</Trans></Button>
                {config === StatsConfigOptions.PointBuy 
                && <PointsCounter value={points} showNoPointsWarning={showNoPointsWarning} />}
            </ButtonContainer>
        </div>
    );
}

export default ManualInputStats;