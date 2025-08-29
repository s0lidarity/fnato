import { Checkbox } from "react95";
import styled from "styled-components";
import { i18n } from '@lingui/core';
import { useState } from "preact/hooks";

import ReminderTooltip from "../../../components/Footer/ReminderTooltip/ReminderTooltip";
import { usePersonalDetails } from "../../../providers/PersonalDetailsContext";
import { useDamagedVeteran } from "../../../providers/DamagedVeteranContext";
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
    const { activateTemplate, deactivateTemplate } = useDamagedVeteran();
    const [showHVModal, setShowHVModal] = useState(false);
    
    // Functions
    const toggleTemplate = (templateId: string) => {
        const isCurrentlyActive = personalDetails.damagedVeteranTemplates.includes(templateId);
        
        if (templateId === HARD_EXPERIENCE.id && !isCurrentlyActive) {
            setShowHVModal(true);
            return; // Don't activate yet, wait for modal confirmation
        }
        
        if (isCurrentlyActive) {
            // Deactivate template
            deactivateTemplate(templateId);
            setPersonalDetails({
                ...personalDetails,
                damagedVeteranTemplates: personalDetails.damagedVeteranTemplates.filter(id => id !== templateId)
            });
        } else {
            // Activate template
            activateTemplate(templateId);
            setPersonalDetails({
                ...personalDetails,
                damagedVeteranTemplates: [...personalDetails.damagedVeteranTemplates, templateId]
            });
        }
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
                onConfirm={() => {
                    // Activate the template after skill selection
                    activateTemplate(HARD_EXPERIENCE.id);
                    setPersonalDetails({
                        ...personalDetails,
                        damagedVeteranTemplates: [...personalDetails.damagedVeteranTemplates, HARD_EXPERIENCE.id]
                    });
                    setShowHVModal(false);
                }}
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