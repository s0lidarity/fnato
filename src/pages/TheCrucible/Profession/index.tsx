import { useState } from 'preact/hooks';
import styled from 'styled-components';
import { ProfessionConfigOptions } from '../../../types/componentTypes';

import ConfigurationBar from '../../../components/ConfigurationBar/ConfigurationBar';

export function Profession() {
    const [config, setConfig] = useState(ProfessionConfigOptions.StandardProfessions);
    const configOptions = [
        { label: 'Standard Professions', value: ProfessionConfigOptions.StandardProfessions },
        { label: 'Custom Professions', value: ProfessionConfigOptions.CustomProfessions },
    ];

    return (
        <div>
            <ConfigurationBar
                config={config}
                setConfig={(newConfig) => setConfig(newConfig as ProfessionConfigOptions)}
                options={configOptions}
            />
            <p>All Profession methods</p>
        </div>
    )
};

export default Profession;