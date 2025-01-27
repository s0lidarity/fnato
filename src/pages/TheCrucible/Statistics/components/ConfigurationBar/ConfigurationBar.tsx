import { Radio, GroupBox } from 'react95';
import styled from 'styled-components';
import { t } from '@lingui/core/macro';

import { StatsConfigOptions, ConfigOptions } from '../../../../../types/componentTypes';

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
            <StyledGroupBox label={t`Options`}>
                {renderRadio({ label: t`Manual Input`, value: StatsConfigOptions.ManualInput })}
                {renderRadio({ label: t`Point Buy`, value: StatsConfigOptions.PointBuy })}
                {renderRadio({ label: t`Dice`, value: StatsConfigOptions.Dice })}
            </StyledGroupBox>
        </ConfigurationBarContainer>
    )
}

export default ConfigurationBar;