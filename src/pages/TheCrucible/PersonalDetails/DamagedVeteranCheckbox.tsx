import { Checkbox } from "react95";
import styled from "styled-components";

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

function DamagedVeteranCheckbox({ template }: {template: DamagedVeteranAdjustment}) {
    const { personalDetails, setPersonalDetails } = usePersonalDetails();

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
        <CheckboxContainer>
            <Checkbox
                checked={personalDetails?.damagedVeteranTemplates?.includes(template.id)}
                value={template.id}
                label={template.label}
                onChange={() => toggleTemplate(template.id)}
            />
            <StyledReminderTooltip
                labelText=""
                reminderText={template.description || "No description available"}
            />
        </CheckboxContainer>
    );
}

export default DamagedVeteranCheckbox;