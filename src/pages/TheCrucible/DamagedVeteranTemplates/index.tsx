import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import styled from 'styled-components';
import { Button, Checkbox, Window, WindowContent, WindowHeader } from 'react95';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { 
    IoInformationCircle, 
    IoClose, 
    IoCheckmark,
    IoBodyOutline,
    IoBulbOutline,
    IoPeopleOutline,
    IoHeartOutline
} from 'react-icons/io5';

import { useDamagedVeteran } from '../../../providers/DamagedVeteranContext';
import { usePersonalDetails } from '../../../providers/PersonalDetailsContext';
import { useStats } from '../../../providers/StatisticsContext';
import { useSkills } from '../../../providers/SkillsContext';
import { useBonds } from '../../../providers/BondsContext';
import { 
    EXTREME_VIOLENCE, 
    HARD_EXPERIENCE, 
    CAPTIVITY_OR_IMPRISONMENT,
    THINGS_MAN_WAS_NOT_MEANT_TO_KNOW,
    DamagedVeteranAdjustment
} from '../../../types/characterTypes';
import { MAX_HARDENED_VETERAN_SKILLS, DV_BONUS } from '../../../constants/gameRules';
import { 
    HardExperienceSkillSelector, 
    TemplateEffectsPreview, 
    DamagedVeteranGuidance 
} from './components';

const PageContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-templates-page',
    'data-component': 'DamagedVeteranTemplates/PageContainer'
})`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-templates-header',
    'data-component': 'DamagedVeteranTemplates/Header'
})`
    text-align: center;
    margin-bottom: 1rem;
`;

const TemplatesGrid = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-templates-grid',
    'data-component': 'DamagedVeteranTemplates/Grid'
})`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
`;

const TemplateCard = styled(Window).attrs<any>({
    'data-testid': 'damaged-veteran-template-card',
    'data-component': 'DamagedVeteranTemplates/TemplateCard'
})<{ isActive: boolean }>`
    ${props => props.isActive && `
        border: 2px solid ${props.theme.materialText};
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    `}
`;

const TemplateHeader = styled(WindowHeader).attrs<any>({
    'data-testid': 'damaged-veteran-template-header',
    'data-component': 'DamagedVeteranTemplates/TemplateHeader'
})`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TemplateContent = styled(WindowContent).attrs<any>({
    'data-testid': 'damaged-veteran-template-content',
    'data-component': 'DamagedVeteranTemplates/TemplateContent'
})`
    padding: 1rem;
`;

const TemplateDescription = styled.p.attrs<any>({
    'data-testid': 'damaged-veteran-template-description',
    'data-component': 'DamagedVeteranTemplates/TemplateDescription'
})`
    margin: 0.5rem 0;
    font-size: 0.9rem;
    line-height: 1.4;
`;

const EffectsList = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-template-effects',
    'data-component': 'DamagedVeteranTemplates/EffectsList'
})`
    margin: 1rem 0;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
`;

const EffectItem = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-template-effect-item',
    'data-component': 'DamagedVeteranTemplates/EffectItem'
})`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.25rem 0;
    font-size: 0.85rem;
`;

const StatEffect = styled.span.attrs<any>({
    'data-testid': 'damaged-veteran-template-stat-effect',
    'data-component': 'DamagedVeteranTemplates/StatEffect'
})<{ isPositive: boolean }>`
    color: ${props => props.isPositive ? '#00ff00' : '#ff0000'};
    font-weight: bold;
`;

const SkillEffect = styled.span.attrs<any>({
    'data-testid': 'damaged-veteran-template-skill-effect',
    'data-component': 'DamagedVeteranTemplates/SkillEffect'
})`
    color: #00ff00;
    font-weight: bold;
`;

const ControlsContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-templates-controls',
    'data-component': 'DamagedVeteranTemplates/Controls'
})`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
`;



const WarningText = styled.p.attrs<any>({
    'data-testid': 'damaged-veteran-templates-warning',
    'data-component': 'DamagedVeteranTemplates/Warning'
})`
    color: ${props => props.theme.warningText};
    font-style: italic;
    margin: 0.5rem 0;
    font-size: 0.9rem;
`;

const SkillBadge = styled.span.attrs<any>({
    'data-testid': 'damaged-veteran-template-skill-badge',
    'data-component': 'DamagedVeteranTemplates/SkillBadge'
})`
    display: inline-block;
    background: #00ff00;
    color: #000;
    padding: 0.2rem 0.5rem;
    margin: 0.2rem;
    border-radius: 4px;
    font-size: 0.8rem;
`;

function DamagedVeteranTemplates() {
    const { personalDetails, setPersonalDetails } = usePersonalDetails();
    const { activeTemplates, selectedHardExperienceSkills, activateTemplate, deactivateTemplate } = useDamagedVeteran();
    const { stats } = useStats();
    const { skills } = useSkills();
    const { bonds } = useBonds();
    const [showHardExperienceModal, setShowHardExperienceModal] = useState(false);

    const templates = [EXTREME_VIOLENCE, CAPTIVITY_OR_IMPRISONMENT, HARD_EXPERIENCE, THINGS_MAN_WAS_NOT_MEANT_TO_KNOW];

    const getStatIcon = (statName: string) => {
        switch (statName.toLowerCase()) {
            case 'strength':
            case 'constitution':
            case 'dexterity':
                return <IoBodyOutline />;
            case 'intelligence':
            case 'power':
                return <IoBulbOutline />;
            case 'charisma':
                return <IoPeopleOutline />;
            case 'sanity':
                return <IoHeartOutline />;
            default:
                return <IoInformationCircle />;
        }
    };

    const handleTemplateToggle = (template: DamagedVeteranAdjustment) => {
        const isActive = personalDetails.damagedVeteranTemplates.includes(template.id);
        
        if (isActive) {
            deactivateTemplate(template.id);
            setPersonalDetails({
                ...personalDetails,
                damagedVeteranTemplates: personalDetails.damagedVeteranTemplates.filter(id => id !== template.id)
            });
        } else {
            if (template.id === HARD_EXPERIENCE.id) {
                setShowHardExperienceModal(true);
            } else {
                activateTemplate(template.id);
                setPersonalDetails({
                    ...personalDetails,
                    damagedVeteranTemplates: [...personalDetails.damagedVeteranTemplates, template.id]
                });
            }
        }
    };

    const handleClearAllTemplates = () => {
        personalDetails.damagedVeteranTemplates.forEach(templateId => {
            deactivateTemplate(templateId);
        });
        setPersonalDetails({
            ...personalDetails,
            damagedVeteranTemplates: []
        });
    };

    const renderStatEffect = (statName: string, adjustment: number | string) => {
        const stat = stats[statName];
        if (!stat) return null;

        let effectValue: number;
        let effectText: string;

        if (typeof adjustment === 'number') {
            effectValue = adjustment;
            effectText = `${adjustment > 0 ? '+' : ''}${adjustment}`;
        } else {
            // Dynamic adjustment based on another stat
            const sourceStat = stats[adjustment];
            effectValue = sourceStat ? -sourceStat.score : 0;
            effectText = `-${sourceStat?.score || 0} (based on ${adjustment})`;
        }

        return (
            <EffectItem key={statName}>
                {getStatIcon(statName)}
                <span>{stat.label}:</span>
                <StatEffect isPositive={effectValue > 0}>{effectText}</StatEffect>
            </EffectItem>
        );
    };

    const renderSkillEffect = (skillName: string, adjustment: number) => {
        const skill = skills.find(s => s.id === skillName);
        if (!skill) return null;

        return (
            <EffectItem key={skillName}>
                <IoCheckmark size={14} />
                <span>{skill.label}:</span>
                <SkillEffect>+{adjustment}%</SkillEffect>
            </EffectItem>
        );
    };

    const renderTemplateCard = (template: DamagedVeteranAdjustment) => {
        const isActive = personalDetails.damagedVeteranTemplates.includes(template.id);
        const isHardExperience = template.id === HARD_EXPERIENCE.id;

        return (
            <TemplateCard key={template.id} isActive={isActive}>
                <TemplateHeader>
                    <span>{template.label}</span>
                    <Checkbox
                        checked={isActive}
                        onChange={() => handleTemplateToggle(template)}
                    />
                </TemplateHeader>
                <TemplateContent>
                    <TemplateDescription>{template.description}</TemplateDescription>
                    
                    <EffectsList>
                        <strong><Trans>Effects:</Trans></strong>
                        {Object.entries(template.statAdjustment).map(([statName, adjustment]) => 
                            renderStatEffect(statName, adjustment)
                        )}
                        {Object.entries(template.skillAdjustment).map(([skillName, adjustment]) => 
                            renderSkillEffect(skillName, adjustment)
                        )}
                        {template.skillSelectionRules && (
                            <EffectItem>
                                <IoInformationCircle size={14} />
                                <span><Trans>Skill Selection:</Trans></span>
                                <span>{template.skillSelectionRules.count} skills +{template.skillSelectionRules.bonus}%</span>
                            </EffectItem>
                        )}
                        {template.bondAdjustment && (
                            <EffectItem>
                                <IoInformationCircle size={14} />
                                <span><Trans>Bonds:</Trans></span>
                                <StatEffect isPositive={false}>
                                    {template.bondAdjustment.remove ? `-${template.bondAdjustment.remove}` : ''}
                                    {template.bondAdjustment.adjustScore ? ` ${template.bondAdjustment.adjustScore > 0 ? '+' : ''}${template.bondAdjustment.adjustScore}` : ''}
                                </StatEffect>
                            </EffectItem>
                        )}
                    </EffectsList>

                    {isHardExperience && (
                        <WarningText>
                            <Trans>Note: This template requires selecting {MAX_HARDENED_VETERAN_SKILLS} additional skills.</Trans>
                        </WarningText>
                    )}

                    {isActive && isHardExperience && selectedHardExperienceSkills.length > 0 && (
                        <div>
                            <strong><Trans>Selected Skills:</Trans></strong>
                            <div style={{ marginTop: '0.5rem' }}>
                                {selectedHardExperienceSkills.map(skillId => {
                                    const skill = skills.find(s => s.id === skillId);
                                    return skill ? (
                                        <SkillBadge key={skillId}>
                                            {skill.label} +{DV_BONUS}%
                                        </SkillBadge>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}

                    <TemplateEffectsPreview template={template} />
                </TemplateContent>
            </TemplateCard>
        );
    };



    return (
        <PageContainer>
            <DamagedVeteranGuidance />

            <TemplatesGrid>
                {templates.map(renderTemplateCard)}
            </TemplatesGrid>

            <ControlsContainer>
                <Button onClick={handleClearAllTemplates} disabled={personalDetails.damagedVeteranTemplates.length === 0}>
                    <Trans>Clear All Templates</Trans>
                </Button>
            </ControlsContainer>

            <HardExperienceSkillSelector
                show={showHardExperienceModal}
                onClose={() => setShowHardExperienceModal(false)}
                onConfirm={() => {
                    setShowHardExperienceModal(false);
                    // Activate the template after skill selection
                    activateTemplate(HARD_EXPERIENCE.id);
                    setPersonalDetails({
                        ...personalDetails,
                        damagedVeteranTemplates: [...personalDetails.damagedVeteranTemplates, HARD_EXPERIENCE.id]
                    });
                }}
            />
        </PageContainer>
    );
}

export default DamagedVeteranTemplates;