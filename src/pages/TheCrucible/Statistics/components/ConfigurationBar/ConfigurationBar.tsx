import { Button, Radio, GroupBox } from 'react95';
import styled from 'styled-components';
import { ConfigOptions } from '../../types';

type RenderRadioParams = {
    label: string;
    value: ConfigOptions;
}

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

    const renderRadio = ({label, value}: RenderRadioParams) => {
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
                {renderRadio({ label: 'Manual Input', value: ConfigOptions.ManualInput })}
                {renderRadio({ label: 'Point Buy', value: ConfigOptions.PointBuy })}
                {renderRadio({ label: 'Dice', value: ConfigOptions.Dice })}
            </StyledGroupBox>
        </ConfigurationBarContainer>
    )
}

export default ConfigurationBar;