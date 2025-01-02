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
            <VerticalHeader>Personal Data</VerticalHeader>
            <PersonalDataGrid>
                <FormRow>
                    <FormField>
                        <label>1. Last Name, First Name, Middle Initial</label>
                        <input type="text" value={nameDisplay} readOnly />
                    </FormField>
                    <FormField>
                        <label>2. Profession (Rank if Applicable)</label>
                        <input type="text" value={professionDisplay || ''} readOnly />
                    </FormField>
                </FormRow>
                <FormRow>
                    <FormField>
                        <label>3. Employer</label>
                        <input type="text" value={personalDetails.employer} readOnly />
                    </FormField>
                    <FormField>
                        <label>4. Nationality</label>
                        <input type="text" value={personalDetails.nationality} readOnly />
                    </FormField>
                </FormRow>
                <FormRow>
                    <FormField>
                        <label>5. Sex</label>
                        <input type="text" value={personalDetails.sex} readOnly />
                    </FormField>
                    <FormField>
                        <label>6. Age and D.O.B.</label>
                        <input 
                            type="text" 
                            value={personalDetails.dateOfBirth ? personalDetails.dateOfBirth.toLocaleDateString() : ''} 
                            readOnly 
                        />
                    </FormField>
                </FormRow>
                <SingleFieldRow>
                    <FormField>
                        <label>7. Education and Occupational History</label>
                        <MMDTextArea 
                            value={personalDetails.education}
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
