import { Radio, GroupBox } from 'react95';
import styled from 'styled-components';

import { ConfigOptions } from '../../types/componentTypes'

type RenderedRadioParams = {
    label: string;
    value: ConfigOptions;
}

const ConfigurationBarContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
`;

const StyledGroupBox = styled(GroupBox)`
    display: flex;
    width: fit-content%;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 1rem;
`;

const StyledRadio = styled(Radio)`
    margin: 0.5rem;
    vertical-align: middle;
`

interface ConfigurationBarProps {
    config: ConfigOptions, 
    setConfig: (config: ConfigOptions) => void, 
    options: RenderedRadioParams[],
};

function ConfigurationBar({ config, setConfig, options }: ConfigurationBarProps) {
    const toggleCheck = (e) => {
        setConfig(e.target.value);
    };

    const renderRadio = ({label, value}: RenderedRadioParams) => {
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
                {options.map(option => renderRadio(option))}
            </StyledGroupBox>
        </ConfigurationBarContainer>
    )
}

export default ConfigurationBar;