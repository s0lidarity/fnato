import { useState } from 'preact/hooks';
import { ProfessionConfigOptions } from '../../../types/componentTypes';

import ConfigurationBar from '../../../components/ConfigurationBar/ConfigurationBar';
import BuildProfession from './components/BuildProfession';
import ChooseProfession from './components/ChooseProfession';
import SkillForm from './components/StandardSkillForm';

export function Profession() {
    const [config, setConfig] = useState(ProfessionConfigOptions.StandardProfessions);
    const configOptions = [
        { label: 'Standard Professions', value: ProfessionConfigOptions.StandardProfessions },
        { label: 'Custom Professions', value: ProfessionConfigOptions.CustomProfessions },
    ];

    const renderProfessionInput = (config: ProfessionConfigOptions) => {
        switch(config){
            case ProfessionConfigOptions.StandardProfessions:
                return <ChooseProfession />;
            case ProfessionConfigOptions.CustomProfessions:
                return <BuildProfession />;
            default:
                throw new Error(`Invalid profession config: ${config}`);
        }
    }

    return (
        <div>
            <ConfigurationBar
                config={config}
                setConfig={(newConfig) => setConfig(newConfig as ProfessionConfigOptions)}
                options={configOptions}
            />
            <div>
                {renderProfessionInput(config)}
            </div>
            <div>
                <SkillForm />
            </div>
        </div>
    )
};

export default Profession;