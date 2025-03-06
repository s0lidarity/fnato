import styled from 'styled-components';
import { msg } from '@lingui/core/macro';
import { TextInput } from 'react95';

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
    const { profession, changeProfession } = useSkills();

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
        changeProfession(newProfession);
    };

    return (
        <FormWrapper>
            <form>
                <TitleContainer>
                    <ReminderTooltip labelText={msg({
                        message: 'Title:'
                    })} reminderText={msg({
                        message: 'The title of your agent\'s day-job'
                    })} />
                    <TextInput value={profession?.name || '' } onChange={(e) => handleChange(e.target.value)} />
                </TitleContainer>
            </form>
        </FormWrapper>
    )
}

export default BuildProfession;