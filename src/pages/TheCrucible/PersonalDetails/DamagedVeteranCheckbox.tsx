import { Checkbox } from "react95";
import styled from "styled-components";
import { i18n } from '@lingui/core';

import ReminderTooltip from "../../../components/Footer/ReminderTooltip/ReminderTooltip";
import { usePersonalDetails } from "../../../providers/PersonalDetailsContext";
import { DamagedVeteranAdjustment } from "../../../types/characterTypes";

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledReminderTooltip = styled(ReminderTooltip)`
    margin-left: 0rem;
`;

// AJS TODO: let users choose appropriate skills for damaged veteran templates

function DamagedVeteranCheckbox({ template }: {template: DamagedVeteranAdjustment}) {
    const { personalDetails, setPersonalDetails } = usePersonalDetails();

    const toggleTemplate = (templateId: string) => {
        const updatedTemplates = personalDetails.damagedVeteranTemplates.includes(templateId)
            ? personalDetails.damagedVeteranTemplates.filter(id => id !== templateId)
            : [...personalDetails.damagedVeteranTemplates, templateId];
            
        setPersonalDetails({
            ...personalDetails,
            damagedVeteranTemplates: updatedTemplates
        });
    };

    return (
        <CheckboxContainer>
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