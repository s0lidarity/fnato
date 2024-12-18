import styled from 'styled-components';
import { GroupBox, Button } from 'react95';
import DamagedVeteranCheckbox from './DamagedVeteranCheckbox';

import { usePersonalDetails } from '../../../providers/PersonalDetailsContext';
import { 
    EXTREME_VIOLENCE, 
    HARD_EXPERIENCE, 
    CAPTIVITY_OR_IMPRISONMENT,
    THINGS_MAN_WAS_NOT_MEANT_TO_KNOW
} from '../../../types/characterTypes';

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

    return (
        <DamagedVeteranTemplatesContainer>
            <StyledGroupBox label="Damaged Veteran Templates">
                <CheckboxContainer>
                    <DamagedVeteranCheckbox template={EXTREME_VIOLENCE} />
                    <DamagedVeteranCheckbox template={CAPTIVITY_OR_IMPRISONMENT} />
                    <DamagedVeteranCheckbox template={HARD_EXPERIENCE} />
                    <DamagedVeteranCheckbox template={THINGS_MAN_WAS_NOT_MEANT_TO_KNOW} />
                </CheckboxContainer>
                <Button onClick={handleClearTemplates}>Clear Templates</Button>
            </StyledGroupBox>
        </DamagedVeteranTemplatesContainer>
    );
}

export default DamagedVeteranTemplates;