import styled from 'styled-components';
import DamagedVeteranCheckbox from './DamagedVeteranCheckbox';
import { t } from '@lingui/core/macro';

import { ButtonWrapper as Button } from '../../../components/wrappers';
import { usePersonalDetails } from '../../../providers/PersonalDetailsContext';
import PageNumberTooltip from '../../../components/PageNumberTooltip/PageNumberTooltip';
import { 
    EXTREME_VIOLENCE, 
    HARD_EXPERIENCE, 
    CAPTIVITY_OR_IMPRISONMENT,
    THINGS_MAN_WAS_NOT_MEANT_TO_KNOW
} from '../../../types/characterTypes';

const InputContainer = styled.div.attrs<any>({
    'data-testid': 'personal-details-input-container',
    'data-component': 'PersonalDetails/InputContainer'
})`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 95%;
    min-width: fit-content;
`;

const DamagedVeteranTemplatesContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-templates-container',
    'data-component': 'PersonalDetails/DamagedVeteranTemplatesContainer',
})`
    display: flex;
    flex-direction: row;
`;

const CheckboxContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-templates-checkbox-container',
    'data-component': 'PersonalDetails/DamagedVeteranTemplatesCheckboxContainer',
})`
    padding: 1rem;
`;

const StyledButton = styled(Button).attrs<any>({
    'data-testid': 'damaged-veteran-templates-button',
    'data-component': 'PersonalDetails/DamagedVeteranTemplatesButton',
})`
    padding: 0.5rem;
    margin-top: 1rem;
    width: fit-content;
    height: fit-content;
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
        <InputContainer>
        <label htmlFor="damagedVeteranTemplates">
            <PageNumberTooltip pageNumber={1}>{t`Damaged Veteran Templates`}</PageNumberTooltip>
        </label>  
        <DamagedVeteranTemplatesContainer>
            
                <CheckboxContainer>
                    <DamagedVeteranCheckbox template={EXTREME_VIOLENCE} />
                    <DamagedVeteranCheckbox template={CAPTIVITY_OR_IMPRISONMENT} />
                    <DamagedVeteranCheckbox template={HARD_EXPERIENCE} />
                    <DamagedVeteranCheckbox template={THINGS_MAN_WAS_NOT_MEANT_TO_KNOW} />
                </CheckboxContainer>
            <StyledButton onClick={handleClearTemplates}>{t`Clear Templates`}</StyledButton>
        </DamagedVeteranTemplatesContainer>
        </InputContainer>
    );
}

export default DamagedVeteranTemplates;