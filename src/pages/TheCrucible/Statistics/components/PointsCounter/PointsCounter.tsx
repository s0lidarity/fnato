import styled from 'styled-components';
import DigitalCounterFont from '../../../../../assets/fonts/digital_counter_7.ttf';

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