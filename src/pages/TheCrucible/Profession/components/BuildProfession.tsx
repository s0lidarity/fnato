import { TextInput } from 'react95';
import styled from 'styled-components';

import { useSkills } from '../../../../providers/SkillsContext';
import { IProfession } from '../../../../types/characterTypes';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';

const FormWrapper = styled.div.attrs<any>({
    'data-testid': 'build-profession-form-wrapper',
    'data-component': 'BuildProfession/FormWrapper',
})`
    display: flex;
    flex-direction: column;
`;

const TitleContainer = styled.div.attrs<any>({
    'data-testid': 'build-profession-title-container',
    'data-component': 'BuildProfession/TitleContainer',
})`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-direction: row;
`;

function BuildProfession() {
    const { currentProfession, setProfession } = useSkills();

    const customProfession: IProfession = {
        name: '',
        professionalSkills: [],
        bondCount: 3,
        recommendedStats: [],
        choosableSkills: [],
        chosenSkillCount: 0,
    };

    const handleChange = (value: string) => {
        const newProfession = { ...customProfession, name: value }; 
        setProfession(newProfession);
    };

    return (
        <FormWrapper>
            <form>
                <TitleContainer>
                    <ReminderTooltip labelText='Title:' reminderText="The title of your agent's day-job" />
                    <TextInput value={currentProfession?.name || '' } onChange={(e) => handleChange(e.target.value)} />
                </TitleContainer>
            </form>
        </FormWrapper>
    )
}

export default BuildProfession;