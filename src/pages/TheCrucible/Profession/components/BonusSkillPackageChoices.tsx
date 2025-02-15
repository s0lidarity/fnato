import styled from 'styled-components';
import { GroupBox, SelectNative, Separator } from 'react95';
import { useState, useEffect } from 'react';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { i18n } from '@lingui/core';

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
    const { applyBonusSkillPackage, BonusSkillPackage, clearBonusSkillPackage } = useSkills();
    const [pendingPackage, setPendingPackage] = useState<string | null>(null);

    useEffect(() => {
        if (pendingPackage) {
            const bsp = Object.values(BonusSkillPackages).find(bsp => bsp.name === pendingPackage);
            if (bsp) {
                applyBonusSkillPackage(bsp);
            }
            setPendingPackage(null);
        }
    }, [pendingPackage]);

    const handleBonusSkillPackageSelect = (packageName: string) => {
        clearBonusSkillPackage();
        if (!packageName) {
            return;
        }
        setPendingPackage(packageName);
    };

    const options = [
        { label: t`No Package (Manual Bonus Points)`, value: "" },
        ...Object.values(BonusSkillPackages).map((bsp: IBonusSkillPackage) => ({
            label: bsp.name, 
            value: bsp.name 
        }))
    ];
    
    const makeSkillLabel = (skill: IBonusSkillChoice) => {
        return `${i18n._(skill.skillLabelMsg)} ${skill.subType && `(${i18n._(skill.subTypeLabelMsg)})`}`;
    }


    return (
        <BonusSkillPackageChoicesContainer>
            <StyledSeparator />
            <div>
                <ReminderTooltip 
                    labelText={t`Choose a bonus skill package`}
                    reminderText={t`Choose a package to automatically apply bonus points, or select 'No Package' to manually assign your bonus points`}
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
                            {makeSkillLabel(skill)}
                        </div>
                    ))}
                    {BonusSkillPackage.personalSpecialties > 0 && (
                        <div>
                            {/* AJS plurals here? */}
                            +{BonusSkillPackage.personalSpecialties} <Trans>personal specialty (any)</Trans>
                        </div>
                    )}
                </SkillsListGroupBox>
            )}
        </BonusSkillPackageChoicesContainer>
    );
}

export default BonusSkillPackageChoices;