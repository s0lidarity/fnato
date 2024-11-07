import styled from 'styled-components';
import DigitalCounterFont from '../../assets/fonts/digital_counter_7.ttf';

const PointsCounterContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ScoreboardDisplay = styled.div<{ color: string }>`
    @font-face {
        font-family: 'Digital Counter';
        src: url(${DigitalCounterFont}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    background-color: ${({ theme }) => theme.materialDark};
    color: ${props => props.color};
    font-family: 'Digital Counter';
    font-size: 1.5rem;
    padding: 0rem 0.25rem;
    min-width: 2rem;
    text-align: center;
    justify-content: center;
    border: 2px solid ${({ theme }) => theme.borderDark};
`;

const PointsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem;
`;

const PointsLabel = styled.label <{ $showWarning?: boolean }>`
    margin-right: 0.5rem;
    padding: 0.25rem;
    color: ${({ $showWarning }) => $showWarning ? ({ theme }) => theme.materialTextDisabled : 'inherit'};
    background-color: ${({ $showWarning }) => $showWarning ? ({ theme }) => theme.canvasTextInvert : 'inherit'};
`;

const getColor = (value: number): string => {
    if (value <= 0) return 'red'; 
    if (value >= 1 && value <= 3) return 'orange';
    if (value >= 4 && value <= 6) return 'yellow';
    return 'green';
};

type PointsCounterProps = {
    value: number;
    showNoPointsWarning?: boolean;
    minDigits?: number;
};

const PointsCounter = ({ value, showNoPointsWarning, minDigits = 2 }: PointsCounterProps ) => {
    const color = getColor(value);
    const displayValue = value.toString().padStart(minDigits, '0');

    return (
        <PointsContainer>
            <PointsLabel $showWarning={showNoPointsWarning}>Points Remaining</PointsLabel>                       
            <PointsCounterContainer>
                <ScoreboardDisplay color={color}>{displayValue}</ScoreboardDisplay>
            </PointsCounterContainer>
        </PointsContainer>
        
    )
}

export default PointsCounter;