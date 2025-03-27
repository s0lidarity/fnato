import { Checkbox } from "react95";
import styled from "styled-components";
import { i18n } from '@lingui/core';
import { useState } from "preact/hooks";

import ReminderTooltip from "../../../components/Footer/ReminderTooltip/ReminderTooltip";
import { usePersonalDetails } from "../../../providers/PersonalDetailsContext";
import { DamagedVeteranAdjustment, HARD_EXPERIENCE } from "../../../types/characterTypes";
import HardExperienceModal from "./HardExperienceModal";

const CheckboxContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-checkbox-container',
    'data-component': 'DamagedVeteranCheckbox/Container'
})`
    display: flex;
    align-items: center;
`;

// Wrapper component with styling
function StyledReminderTooltip(props) {
    const wrapperStyle = {
        marginLeft: '0rem'
    };
    
    return (
        <div style={wrapperStyle} data-testid="damaged-veteran-reminder-tooltip" data-component="DamagedVeteranCheckbox/ReminderTooltip">
            <ReminderTooltip {...props} />
        </div>
    );
}

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
        if(templateId === HARD_EXPERIENCE.id && !personalDetails.damagedVeteranTemplates.includes(HARD_EXPERIENCE.id)) {
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

    // Prepare the tooltip props
    const tooltipProps = {
        labelText: "",
        reminderText: template.descriptionMsg || template.description
    };
    
    return (
        <CheckboxContainer>
            <HardExperienceModal
                show={showHVModal}
                setShow={setShowHVModal}
            />
            <Checkbox
                checked={personalDetails?.damagedVeteranTemplates?.includes(template.id)}
                value={template.id}
                label={template.labelMsg ? i18n._(template.labelMsg) : template.label}
                onChange={() => toggleTemplate(template.id)}
            />
            <StyledReminderTooltip {...tooltipProps} />
        </CheckboxContainer>
    );
}

export default DamagedVeteranCheckbox;