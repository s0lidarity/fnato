import { Radio, GroupBox } from 'react95';
import styled from 'styled-components';
import { t } from '@lingui/core/macro';

import { ConfigOptions } from '../../../../../types/componentTypes';

type RenderRadioParams = {
    label: string;
    value: ConfigOptions;
}

type ConfigurationBarProps = {
    config: ConfigOptions;
    setConfig: (config: ConfigOptions) => void;
    options: { label: string; value: ConfigOptions }[];
}

const ConfigurationBarContainer = styled.div.attrs<any>({
    'data-testid': 'configuration-bar-container',
    'data-component': 'ConfigurationBar/ConfigurationBarContainer',
})`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
`;

const StyledGroupBox = styled(GroupBox).attrs<any>({
    'data-testid': 'group-box',
    'data-component': 'ConfigurationBar/GroupBox',
})`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
`;

const StyledRadio = styled(Radio).attrs<any>({
    'data-testid': 'radio',
    'data-component': 'ConfigurationBar/Radio',
})`
    margin: 0.5rem;
    vertical-align: middle;
`

function ConfigurationBar({ config, setConfig, options }: ConfigurationBarProps) {

    const toggleCheck = (e) => {
        setConfig(e.target.value);
    };



    const renderRadio = ({label, value}: RenderRadioParams) => {
        return (
                <StyledRadio
                    key={label}
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
            <StyledGroupBox label={t`Options`}>
                {options.map(({ label, value }) => renderRadio({ label, value }))}
            </StyledGroupBox>
        </ConfigurationBarContainer>
    )
}

export default ConfigurationBar;