import { 
    PersonalDataSection as StyledPersonalDataSection,
    PersonalDataGrid,
    FormRow,
    FormField,
    SingleFieldRow,
    MMDTextArea
} from '../styles/PersonalData.styles';
import { VerticalHeader } from '../styles/CharacterSheet.styles';
import { DetailedDescription } from '../../../types/characterTypes';
import { t } from '@lingui/core/macro';

interface PersonalDataSectionProps {
    nameDisplay: string;
    professionDisplay: string | undefined;
    personalDetails: DetailedDescription;
}

export const PersonalDataSection = ({ 
    nameDisplay, 
    professionDisplay, 
    personalDetails 
}: PersonalDataSectionProps) => {
    return (
        <StyledPersonalDataSection>
            <VerticalHeader>{t`Personal Data`}</VerticalHeader>
            <PersonalDataGrid>
                <FormRow>
                    <FormField>
                        <label>{t`1. Name`}</label>
                        <input type="text" value={nameDisplay} readOnly />
                    </FormField>
                    <FormField>
                        <label>{t`2. Profession`}</label>
                        <input type="text" value={professionDisplay || ''} readOnly />
                    </FormField>
                </FormRow>
                <FormRow>
                    <FormField>
                        <label>{t`3. Employer`}</label>
                        <input type="text" value={personalDetails.employer || ''} readOnly />
                    </FormField>
                    <FormField>
                        <label>{t`4. Nationality`}</label>
                        <input type="text" value={personalDetails.nationality || ''} readOnly />
                    </FormField>
                </FormRow>
                <FormRow>
                    <FormField>
                        <label>{t`5. Sex`}</label>
                        <input type="text" value={personalDetails.sex || ''} readOnly />
                    </FormField>
                    <FormField>
                        <label>{t`6. Age and D.O.B.`}</label>
                        <input 
                            type="text" 
                            value={personalDetails.dateOfBirth ? personalDetails.dateOfBirth.toLocaleDateString() : ''} 
                            readOnly 
                        />
                    </FormField>
                </FormRow>
                <SingleFieldRow>
                    <FormField>
                        <label>{t`7. Education and Occupational History`}</label>
                        <MMDTextArea 
                            value={personalDetails.education || ''}
                            rows={3}
                            readOnly
                        />
                    </FormField>
                </SingleFieldRow>
            </PersonalDataGrid>
        </StyledPersonalDataSection>
    );
};

export default PersonalDataSection;
