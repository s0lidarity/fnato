import styled from 'styled-components';

const PointsCounterContainer = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
`;

const ScoreboardDisplay = styled.div<{ color: string }>`
    background-color: #000;
    color: ${props => props.color};
    font-size: 1.5rem;
    padding: 0.25rem;
    border-radius: 0.25rem;
    min-width: 2rem;
    text-align: right;
`;

const getColor = (value: number): string => {
    if (value <= 0) return 'red'; 
    if (value >= 1 && value <= 3) return 'orange';
    if (value >= 4 && value <= 6) return 'yellow';
    return 'green';
};

const PointsCounter = ({ value, minDigits = 2 }: { value: number, minDigits?: number }) => {
    const color = getColor(value);
    const displayValue = value.toString().padStart(minDigits, '0');

    return (
        <PointsCounterContainer>
            <ScoreboardDisplay color={color}>{displayValue}</ScoreboardDisplay>
        </PointsCounterContainer>
    )
}

export default PointsCounter;