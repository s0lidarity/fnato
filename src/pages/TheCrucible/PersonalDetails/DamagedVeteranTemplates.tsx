import styled from 'styled-components';
import { GroupBox, Checkbox, Button } from 'react95';

import { usePersonalDetails } from '../../../providers/PersonalDetailsContext';

const DamagedVeteranTemplatesContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-templates-container',
    'data-component': 'PersonalDetails/DamagedVeteranTemplatesContainer',
})`
    display: flex;
    flex-direction: column;
`;

const StyledGroupBox = styled(GroupBox).attrs<any>({
    'data-testid': 'damaged-veteran-templates-group-box',
    'data-component': 'PersonalDetails/DamagedVeteranTemplatesGroupBox',
})`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CheckboxContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-templates-checkbox-container',
    'data-component': 'PersonalDetails/DamagedVeteranTemplatesCheckboxContainer',
})`
    padding: 1rem;
`;

function DamagedVeteranTemplates() {
    const { personalDetails, setPersonalDetails } = usePersonalDetails();

    const handleClearTemplates = () => {
        setPersonalDetails({
            ...personalDetails,
            damagedVeteranTemplates: []
        });
    };

    const toggleTemplate = (templateId: string) => {
        console.log("toggleTemplate", templateId, personalDetails);
        const updatedTemplates = personalDetails.damagedVeteranTemplates.includes(templateId)
            ? personalDetails.damagedVeteranTemplates.filter(id => id !== templateId)
            : [...personalDetails.damagedVeteranTemplates, templateId];
            
        setPersonalDetails({
            ...personalDetails,
            damagedVeteranTemplates: updatedTemplates
        });
    };

    return (
        <DamagedVeteranTemplatesContainer>
            <StyledGroupBox title="Damaged Veteran Templates">
                <CheckboxContainer>
                    <Checkbox
                        checked={personalDetails?.damagedVeteranTemplates?.includes("extreme-violence") || false}
                        value="extreme-violence"
                        label="Extreme Violence"
                        onChange={() => toggleTemplate("extreme-violence")} />
                </CheckboxContainer>
                <Button onClick={handleClearTemplates}>Clear Templates</Button>
            </StyledGroupBox>
        </DamagedVeteranTemplatesContainer>
    );
}

export default DamagedVeteranTemplates;