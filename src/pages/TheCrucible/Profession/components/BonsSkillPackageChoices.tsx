import styled from 'styled-components';
import { SelectNative, Separator } from 'react95';

import { IBonusSkillChoice, IBonusSkillPackage } from '../../../../utils/SkillPointPackages';
import { useSkills } from '../../../../providers/SkillsContext';
import { BonusSkillPackages } from '../../../../utils/SkillPointPackages';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';

const BonusSkillPackageChoicesContainer = styled.div.attrs<any>({
    'data-testid': 'bonus-skill-package-choices-container',
    'data-component': 'BonusSkillPackageChoices/BonusSkillPackageChoicesContainer'
})`
`;

const StyledSeparator = styled(Separator).attrs<any>({
    'data-testid': 'bonus-skill-package-choices-separator',
    'data-component': 'BonusSkillPackageChoices/StyledSeparator'
})`
    align-self: center;
    justify-self: center;
    margin: 0.5rem 0;
`;


const StyledLabel = styled.label.attrs<any>({
    'data-testid': 'bonus-skill-package-choices-label',
    'data-component': 'BonusSkillPackageChoices/StyledLabel'
})`
    margin: 0.5rem;
`;

const StyledSelect = styled(SelectNative).attrs<any>({
    'data-testid': 'bonus-skill-package-choices-select',
    'data-component': 'BonusSkillPackageChoices/StyledSelect'
})`
    margin: 0.5rem;
    width: fit-content;
`;

function BonusSkillPackageChoices(){
    const { applyBonusSkillPackage } = useSkills();

    const options = Object.values(BonusSkillPackages).map((bsp: IBonusSkillPackage) => {
        return { label: bsp.name, value: bsp.name };
    });

    const handleBonusSkillPackageSelect = (e: any) => {
        const bsp = Object.values(BonusSkillPackages).find(bsp => bsp.name === e.target.value);
        if(bsp){
            applyBonusSkillPackage(bsp);
        }
    }
    
    return (
        <BonusSkillPackageChoicesContainer>
            <StyledSeparator />
            <div>
                    <ReminderTooltip 
                        labelText='Choose a bonus skill package'
                        reminderText="Represents your Agent's previous career or hobbies and distributes 20 point bonuses accordingly"
                    />
                <StyledSelect 
                    options={options} 
                    defaultValue={""} 
                    onChange={handleBonusSkillPackageSelect}
                />
            </div>
            <div>

            </div>
        </BonusSkillPackageChoicesContainer>
    );
}

export default BonusSkillPackageChoices;