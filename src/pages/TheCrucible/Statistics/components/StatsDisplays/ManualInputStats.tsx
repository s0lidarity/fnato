import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import { Button, Counter } from 'react95';   

import { useStats } from '../../../../../providers/StatisticsContext';
import StatInput from '../StatInput/StatInput';
import { Statistics } from '../../../../../types/characterTypes';
import { ConfigOptions } from '../../types';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    align-items: center;
`;

const PointsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 0.25rem solid;
    padding: 0.25rem;
    border-color: ${({ theme }) => theme.borderDark};
`;

const PointsLabel = styled.label <{ showWarning?: boolean }>`
    margin-right: 0.5rem;
    color: ${({ showWarning }) => showWarning ? ({ theme }) => theme.materialTextDisabled : 'inherit'};
    background-color: ${({ showWarning }) => showWarning ? ({ theme }) => theme.canvasTextInvert : 'inherit'};
`;

interface ManualInputStatsProps {
    config: ConfigOptions;
}

const DEFAULT_POINTS = 72;

function ManualInputStats( { config }: ManualInputStatsProps)  {
    const { resetStats, stats, setStats } = useStats();
    const [points, setPoints] = useState(DEFAULT_POINTS-(6*10));
    const [showNoPointsWarning, setShowNoPointsWarning] = useState(false);

    // need to refactor this onChange, need to block raising values if points <=0
    const handleChange = useCallback((statKey: keyof Statistics)=> (value: number) => {
        const currentValue = stats[statKey].score;
        const difference = value - currentValue;

        if(config === ConfigOptions.PointBuy) {
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
    }, [stats, setStats, config, points]);

    const calculateRemainingPoints = useCallback((stats: Statistics) => {
        let total = 0;
        for (const stat in stats) {
            if (stats.hasOwnProperty(stat)) {
                total += stats[stat as keyof Statistics].score;
            }
        }
        return (DEFAULT_POINTS - total);
    }, []);

    useEffect(() => {
        setPoints(calculateRemainingPoints(stats));
    }, [stats, calculateRemainingPoints]);

    const renderStatInputs = useCallback(() => {
        return Object.keys(stats).map((statKey) => {
            return (
                <StatInput
                    key={statKey}
                    statKey={statKey}
                    handleChange={handleChange}
                />
            )
        });
    }, [stats, handleChange]);

    return(
        <div>
            {renderStatInputs()}
            <ButtonContainer>
                <Button onClick={resetStats}>Reset Stats</Button>
                {config === ConfigOptions.PointBuy && 
                    <PointsContainer>
                        <PointsLabel showWarning={showNoPointsWarning}>Points Remaining</PointsLabel>                       
                        {/* @ts-ignore */}
                        <Counter size="sm"
                            minLength={2} 
                            value={points} 
                        />
                    </PointsContainer>}
            </ButtonContainer>
        </div>
    );
}

export default ManualInputStats;