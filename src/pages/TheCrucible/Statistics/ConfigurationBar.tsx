import { Button, Radio, GroupBox } from 'react95';
import styled from 'styled-components';

const ConfigurationBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
`;

const StyledGroupBox = styled(GroupBox)`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
`;

const StyledRadio = styled(Radio)`
    margin: 0.5rem;
    vertical-align: middle;
`

function ConfigurationBar({ config, setConfig }) {
    const toggleCheck = (e) => {
        setConfig(e.target.value);
    };

    const renderRadio = (label, value) => {
        return (
            <StyledRadio
                checked={config === value}
                onChange={toggleCheck}
                name="Config"
                label={label}
                value={value}
            />
        );
    };

    return (
        <ConfigurationBarContainer>
            <StyledGroupBox label="Options">
                {renderRadio('Manual Input', 'ManualInput')}                    
                {renderRadio('Point Buy', 'PointBuy')}
                {renderRadio('Dice', 'Dice')}
                {renderRadio('Recommended Array', 'RecommendedArray')}
            </StyledGroupBox>
        </ConfigurationBarContainer>
    )
}

export default ConfigurationBar;