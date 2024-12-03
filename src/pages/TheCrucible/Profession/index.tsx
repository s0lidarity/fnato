import { useState } from 'preact/hooks';
import { ProfessionConfigOptions } from '../../../types/componentTypes';
import styled from 'styled-components';

import ConfigurationBar from '../../../components/ConfigurationBar/ConfigurationBar';
import StandardSkillForm from './components/StandardSkillForm';
import CustomSkillForm from './components/CustomSkillForm';
import ProfessionalGuidance from './components/ProfessionalGuidance';


const ProfessionalGuidanceContainer = styled.div.attrs<any>({
    'data-testid': 'profession-professional-guidance-container',
    'data-component': 'Profession/ProfessionalGuidanceContainer',
})`
    display: flex;
    justify-self: center;
    align-items: center;
    width: 90%;
`;

export function Profession() {
    const [config, setConfig] = useState(ProfessionConfigOptions.StandardProfessions);
    const configOptions = [
        { label: 'Standard Professions', value: ProfessionConfigOptions.StandardProfessions },
        { label: 'Custom Professions', value: ProfessionConfigOptions.CustomProfessions },
    ];

    const renderSkillForm = (config: ProfessionConfigOptions) => {
        switch(config){
            case ProfessionConfigOptions.StandardProfessions:
                return <StandardSkillForm />;
            case ProfessionConfigOptions.CustomProfessions:
                return <CustomSkillForm />;
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
            <ProfessionalGuidanceContainer>
                <ProfessionalGuidance />
            </ProfessionalGuidanceContainer>
            <div>
                {renderSkillForm(config)}
            </div>
        </div>
    )
};

export default Profession;