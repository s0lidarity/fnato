import { ProfessionConfigOptions } from '../../../types/componentTypes';
import styled from 'styled-components';
import { Button } from 'react95';
import ConfigurationBar from '../../../components/ConfigurationBar/ConfigurationBar';
import StandardSkillForm from './components/StandardSkillForm';
import CustomSkillForm from './components/CustomSkillForm';
import ProfessionalGuidance from './components/ProfessionalGuidance';
import { useSkills } from '../../../providers/SkillsContext';


const ProfessionalGuidanceContainer = styled.div.attrs<any>({
    'data-testid': 'profession-professional-guidance-container',
    'data-component': 'Profession/ProfessionalGuidanceContainer',
})`
    display: flex;
    justify-self: center;
    align-items: center;
    width: 90%;
`;

const ButtonsContainer = styled.div.attrs<any>({
    'data-testid': 'profession-buttons-container',
    'data-component': 'Profession/ButtonsContainer',
})`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

export function Profession() {
    const { config, changeConfig, resetProfession } = useSkills();
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
                setConfig={(newConfig) => changeConfig(newConfig as ProfessionConfigOptions)}
                options={configOptions}
            />
            <ProfessionalGuidanceContainer>
                <ProfessionalGuidance />
            </ProfessionalGuidanceContainer>
            <div>
                {renderSkillForm(config)}
            </div>
            <ButtonsContainer>
                <Button onClick={resetProfession}>Reset Profession</Button>
            </ButtonsContainer>
        </div>
    )
};

export default Profession;