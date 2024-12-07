import styled from 'styled-components';
import { GroupBox, SelectNative, Separator } from 'react95';
import { useTranslation } from 'preact-i18next';

import { IBonusSkillPackage } from '../../../../utils/SkillPointPackages';
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

const SkillsListGroupBox = styled(GroupBox).attrs<any>({
    'data-testid': 'bonus-skill-package-skills-list',
    'data-component': 'BonusSkillPackageChoices/SkillsList'
})`
    margin: 1rem 0;
    padding: 1rem;
    background: ${({ theme }) => theme.materialDark};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.5rem;
`;

function BonusSkillPackageChoices(){
    const { t } = useTranslation();
    const { applyBonusSkillPackage, BonusSkillPackage, clearBonusSkillPackage } = useSkills();

    const options = [
        { label: "No Package (Manual Bonus Points)", value: "" },
        ...Object.values(BonusSkillPackages).map((bsp: IBonusSkillPackage) => ({
            label: bsp.name, 
            value: bsp.name 
        }))
    ];

    const handleBonusSkillPackageSelect = (packageName: string) => {
        if (!packageName) {
            clearBonusSkillPackage();
            return;
        }

        const bsp = Object.values(BonusSkillPackages).find(bsp => bsp.name === packageName);
        if(bsp){
            // need to clear previous bonus package/custom bonus package before applying new one
            clearBonusSkillPackage();
            applyBonusSkillPackage(bsp);
        }
    }
    
    return (
        <BonusSkillPackageChoicesContainer>
            <StyledSeparator />
            <div>
                <ReminderTooltip 
                    labelText='Choose a bonus skill package'
                    reminderText="Choose a package to automatically apply bonus points, or select 'No Package' to manually assign your bonus points"
                />
                <StyledSelect 
                    options={options} 
                    value={BonusSkillPackage?.name || ""}
                    onChange={(e: any) => handleBonusSkillPackageSelect(e.value)}
                />
            </div>
            {BonusSkillPackage && (
                <SkillsListGroupBox variant='flat' label='Bonus Points'>
                    {BonusSkillPackage.skills.map((skill, index) => (
                        <div key={`${skill.skillName}-${skill.subType}-${index}`}>
                            {skill.skillName} {skill.subType && ` (${skill.subType})`}
                        </div>
                    ))}
                    {BonusSkillPackage.personalSpecialties > 0 && (
                        <div>
                            +{BonusSkillPackage.personalSpecialties} personal {t('specialty', { count: BonusSkillPackage.personalSpecialties })} (any)
                        </div>
                    )}
                </SkillsListGroupBox>
            )}
        </BonusSkillPackageChoicesContainer>
    );
}

export default BonusSkillPackageChoices;