import { Checkbox } from "react95";
import styled from "styled-components";
import { i18n } from '@lingui/core';
import { useState } from "preact/hooks";

import ReminderTooltip from "../../../components/Footer/ReminderTooltip/ReminderTooltip";
import { usePersonalDetails } from "../../../providers/PersonalDetailsContext";
import { DamagedVeteranAdjustment, HARD_EXPERIENCE } from "../../../types/characterTypes";
import DamagedVeteranModal from "./DamagedVeteranModal";

const CheckboxContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-checkbox-container',
    'data-component': 'DamagedVeteranCheckbox/Container'
})`
    display: flex;
    align-items: center;
`;

const StyledReminderTooltip = styled(ReminderTooltip).attrs<any>({
    'data-testid': 'damaged-veteran-reminder-tooltip',
    'data-component': 'DamagedVeteranCheckbox/ReminderTooltip'
})`
    margin-left: 0rem;
`;

// AJS TODO: let users choose appropriate skills for damaged veteran templates

interface DamagedVeteranCheckboxProps {
    template: DamagedVeteranAdjustment;
}

function DamagedVeteranCheckbox({ template }: DamagedVeteranCheckboxProps) {
    // State values
    const { personalDetails, setPersonalDetails } = usePersonalDetails();
    const [showHVModal, setShowHVModal] = useState(false);
    // AJS Starting point: choose a bond to remove when appropriate might need to stack the modals
    
    // Functions
    const toggleTemplate = (templateId: string) => {
        // AJS Starting point: clear the HV skills when deselected, and only show the modal if it was not previously selected
        if(templateId === HARD_EXPERIENCE.id) {
            setShowHVModal(true);
        }
        const updatedTemplates = personalDetails.damagedVeteranTemplates.includes(templateId)
            ? personalDetails.damagedVeteranTemplates.filter(id => id !== templateId)
            : [...personalDetails.damagedVeteranTemplates, templateId];
            
        setPersonalDetails({
            ...personalDetails,
            damagedVeteranTemplates: updatedTemplates
        });
    };

    // AJS TODO: reminderText for tooltips is empty, fix it
    return (
        <CheckboxContainer>
            <DamagedVeteranModal
                show={showHVModal}
                setShow={setShowHVModal}
            />
            <Checkbox
                checked={personalDetails?.damagedVeteranTemplates?.includes(template.id)}
                value={template.id}
                label={template.labelMsg ? i18n._(template.labelMsg) : template.label}
                onChange={() => toggleTemplate(template.id)}
            />
            <StyledReminderTooltip
                labelText=""
                reminderText={template.descriptionMsg ? i18n._(template.descriptionMsg) : template.description || "No description available"}
            />
        </CheckboxContainer>
    );
}

export default DamagedVeteranCheckbox;