import { h } from 'preact';
import styled from 'styled-components';
import { Window, WindowContent, WindowHeader } from 'react95';
import { Trans } from '@lingui/react/macro';
import { 
    IoInformationCircle, 
    IoTrendingUp, 
    IoTrendingDown,
    IoBodyOutline,
    IoBulbOutline,
    IoPeopleOutline,
    IoGlassesSharp
} from 'react-icons/io5';

import { useStats } from '../../../../providers/StatisticsContext';
import { useDamagedVeteran } from '../../../../providers/DamagedVeteranContext';
import { useSkills } from '../../../../providers/SkillsContext';
import { useBonds } from '../../../../providers/BondsContext';
import { DamagedVeteranAdjustment, Statistics } from '../../../../types/characterTypes';
import { 
    isBaseStat, 
    isDerivedAttribute, 
    getStatOrDerivedAttributeLabel,
    calculateStatEffectValue,
    calculateDerivedAttributeEffectValue
} from '../../../../utils/statHelpers';


// Local color constants to replace non-existent theme colors
const POSITIVE_COLOR = '#00aa00'; // Green for positive effects
const NEGATIVE_COLOR = '#aa0000'; // Red for negative effects

const PreviewContainer = styled.div.attrs<any>({
    'data-testid': 'template-effects-preview-container',
    'data-component': 'TemplateEffectsPreview/Container'
})`
    margin-top: 1rem;
`;

const PreviewWindow = styled(Window).attrs<any>({
    'data-testid': 'template-effects-preview-window',
    'data-component': 'TemplateEffectsPreview/Window'
})`
    margin-bottom: 1rem;
`;

const PreviewHeader = styled(WindowHeader).attrs<any>({
    'data-testid': 'template-effects-preview-header',
    'data-component': 'TemplateEffectsPreview/Header'
})`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const HeaderIcon = styled(IoInformationCircle).attrs<any>({
    'data-testid': 'template-effects-preview-header-icon',
    'data-component': 'TemplateEffectsPreview/HeaderIcon'
})`
    width: 1rem;
    height: 1rem;
`;

const PreviewContent = styled(WindowContent).attrs<any>({
    'data-testid': 'template-effects-preview-content',
    'data-component': 'TemplateEffectsPreview/Content'
})`
    padding: 1rem;
`;

const EffectsSection = styled.div.attrs<any>({
    'data-testid': 'template-effects-preview-section',
    'data-component': 'TemplateEffectsPreview/Section'
})`
    margin-bottom: 1rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const SectionTitle = styled.h4.attrs<any>({
    'data-testid': 'template-effects-preview-section-title',
    'data-component': 'TemplateEffectsPreview/SectionTitle'
})`
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
`;

const EffectsList = styled.div.attrs<any>({
    'data-testid': 'template-effects-preview-effects-list',
    'data-component': 'TemplateEffectsPreview/EffectsList'
})`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
`;

const EffectItem = styled.div.attrs<any>({
    'data-testid': 'template-effects-preview-effect-item',
    'data-component': 'TemplateEffectsPreview/EffectItem'
})`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: ${({ theme }) => theme.canvas};
    border-radius: 4px;
    font-size: 0.85rem;
`;

const StatValue = styled.span.attrs<any>({
    'data-testid': 'template-effects-preview-stat-value',
    'data-component': 'TemplateEffectsPreview/StatValue'
})<{ isPositive: boolean }>`
    color: ${({ isPositive }) => isPositive ? POSITIVE_COLOR : NEGATIVE_COLOR};
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const SkillValue = styled.span.attrs<any>({
    'data-testid': 'template-effects-preview-skill-value',
    'data-component': 'TemplateEffectsPreview/SkillValue'
})`
    color: ${POSITIVE_COLOR};
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const BondValue = styled.span.attrs<any>({
    'data-testid': 'template-effects-preview-bond-value',
    'data-component': 'TemplateEffectsPreview/BondValue'
})<{ isPositive: boolean }>`
    color: ${({ isPositive }) => isPositive ? POSITIVE_COLOR : NEGATIVE_COLOR};
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const TrendIcon = styled(IoTrendingUp).attrs<any>({
    'data-testid': 'template-effects-preview-trend-up-icon',
    'data-component': 'TemplateEffectsPreview/TrendUpIcon'
})`
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
`;

const TrendDownIcon = styled(IoTrendingDown).attrs<any>({
    'data-testid': 'template-effects-preview-trend-down-icon',
    'data-component': 'TemplateEffectsPreview/TrendDownIcon'
})`
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
`;

const NoEffects = styled.p.attrs<any>({
    'data-testid': 'template-effects-preview-no-effects',
    'data-component': 'TemplateEffectsPreview/NoEffects'
})`
    font-style: italic;
    color: ${({ theme }) => theme.materialText};
    opacity: 0.6;
    margin: 0;
    font-size: 0.85rem;
`;

interface TemplateEffectsPreviewProps {
    template: DamagedVeteranAdjustment;
}

function TemplateEffectsPreview({ template }: TemplateEffectsPreviewProps) {
    const { stats, derivedAttributes, getEffectiveStatValue, getEffectiveDerivedAttribute } = useStats();
    const { activeTemplates } = useDamagedVeteran();
    const { skills } = useSkills();
    const { bonds } = useBonds();

    const isTemplateActive = activeTemplates.includes(template.id);

    // AJS TODO: make utility and add icons to statistics page
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
                return <IoGlassesSharp />;
            default:
                return <IoInformationCircle />;
        }
    };

    const renderStatEffect = (statName: string, adjustment: number | string) => {
        // Determine if it's a base stat or derived attribute
        const isStat = isBaseStat(statName);
        const isDerived = isDerivedAttribute(statName);
        
        if (!isStat && !isDerived) return null;

        // Get label using shared utility
        const label = getStatOrDerivedAttributeLabel(statName, stats, derivedAttributes);

        // Calculate effect value and text using shared utilities
        let effectValue: number;
        let effectText: string;
        let currentValue: number;
        let baseValue: number;

        // For preview, include this template in the active templates to show the effect
        const previewActiveTemplates = activeTemplates.includes(template.id) 
            ? activeTemplates 
            : [...activeTemplates, template.id];

        if (isStat) {
            // Base stat - use effective value from context (includes all adjustments)
            // AJS TODO: base value needs to be the current/base value exlcuding this template
            baseValue = getEffectiveStatValue(statName, activeTemplates);
            const effect = calculateStatEffectValue(
                adjustment as number | keyof Statistics, 
                stats
            );
            effectValue = effect.effectValue;
            effectText = effect.effectText;
            // Calculate what the value would be with this template applied
            currentValue = getEffectiveStatValue(statName, previewActiveTemplates);
        } else {
            // Derived attribute - use effective value from context (includes all adjustments)
            baseValue = getEffectiveDerivedAttribute(statName, activeTemplates);
            const effect = calculateDerivedAttributeEffectValue(
                adjustment as number | keyof Statistics, 
                stats
            );
            effectValue = effect.effectValue;
            effectText = effect.effectText;
            // Calculate what the value would be with this template applied
            currentValue = getEffectiveDerivedAttribute(statName, previewActiveTemplates);
        }

        // If template is already active, show simple format without comparison
        if (isTemplateActive) {
            return (
                <EffectItem key={statName}>
                    {getStatIcon(statName)}
                    <span>{label}:</span>
                    <span>{currentValue}</span>
                </EffectItem>
            );
        }

        return (
            <EffectItem key={statName}>
                {getStatIcon(statName)}
                <span>{label}:</span>
                <span>{baseValue}</span>
                <StatValue isPositive={effectValue > 0}>
                    {effectValue > 0 ? <TrendIcon /> : <TrendDownIcon />}
                    {effectText}
                </StatValue>
                <span>= {currentValue}</span>
            </EffectItem>
        );
    };

    const renderSkillEffect = (skillName: string, adjustment: number) => {
        const skill = skills.find(s => s.id === skillName);
        if (!skill) return null;

        const currentValue = skill.value + adjustment;

        // If template is already active, show simple format without comparison
        if (isTemplateActive) {
            return (
                <EffectItem key={skillName}>
                    <span>{skill.label}:</span>
                    <span>{currentValue}%</span>
                </EffectItem>
            );
        }

        return (
            <EffectItem key={skillName}>
                <span>{skill.label}:</span>
                <span>{skill.value}%</span>
                <SkillValue>
                    <TrendIcon />
                    +{adjustment}%
                </SkillValue>
                <span>= {currentValue}%</span>
            </EffectItem>
        );
    };

    const renderBondEffect = () => {
        if (!template.bondAdjustment) return null;

        const { remove, adjustScore } = template.bondAdjustment;
        const currentBonds = bonds.length;
        const finalBonds = currentBonds + (adjustScore || 0) - (remove || 0);

        // If template is already active, show simple format without comparison
        if (isTemplateActive) {
            return (
                <EffectItem>
                    <span><Trans>Bonds:</Trans></span>
                    <span>{finalBonds}</span>
                </EffectItem>
            );
        }

        // AJS TODO: bonds cannot be < 0
        return (
            <EffectItem>
                <span><Trans>Bonds:</Trans></span>
                <span>{currentBonds}</span>
                {remove && (
                    <BondValue isPositive={false}>
                        <TrendDownIcon />
                        -{remove}
                    </BondValue>
                )}
                {adjustScore && (
                    <BondValue isPositive={adjustScore > 0}>
                        {adjustScore > 0 ? <TrendIcon /> : <TrendDownIcon />}
                        {adjustScore > 0 ? '+' : ''}{adjustScore}
                    </BondValue>
                )}
                <span>= {finalBonds}</span>
            </EffectItem>
        );
    };

    const hasStatEffects = Object.keys(template.statAdjustment).length > 0;
    const hasSkillEffects = Object.keys(template.skillAdjustment).length > 0;
    const hasBondEffects = !!template.bondAdjustment;
    const hasSkillSelection = !!template.skillSelectionRules;

    if (!hasStatEffects && !hasSkillEffects && !hasBondEffects && !hasSkillSelection) {
        return (
            <PreviewContainer>
                <PreviewWindow>
                    <PreviewHeader>
                        <HeaderIcon />
                        <span><Trans>Preview</Trans></span>
                    </PreviewHeader>
                    <PreviewContent>
                        <NoEffects><Trans>This template has no direct effects on character stats or skills.</Trans></NoEffects>
                    </PreviewContent>
                </PreviewWindow>
            </PreviewContainer>
        );
    }

    return (
                    <PreviewContainer>
                <PreviewWindow>
                    <PreviewHeader>
                        <HeaderIcon />
                        <span>{isTemplateActive ? <Trans>Current Changes</Trans> : <Trans>Preview</Trans>}</span>
                    </PreviewHeader>
                <PreviewContent>
                    {/* AJS: TODO revisit this, some temlates without stat changes still show this block */}
                    {hasStatEffects && (
                        <EffectsSection>
                            <SectionTitle>
                                <Trans>Stats</Trans>
                            </SectionTitle>
                            <EffectsList>
                                {Object.entries(template.statAdjustment).map(([statName, adjustment]) => 
                                    renderStatEffect(statName, adjustment)
                                )}
                            </EffectsList>
                        </EffectsSection>
                    )}

                    {hasSkillEffects && (
                        <EffectsSection>
                            <SectionTitle>
                                <Trans>Skills</Trans>
                            </SectionTitle>
                            <EffectsList>
                                {Object.entries(template.skillAdjustment).map(([skillName, adjustment]) => 
                                    renderSkillEffect(skillName, adjustment)
                                )}
                            </EffectsList>
                        </EffectsSection>
                    )}

                    {hasSkillSelection && (
                        <EffectsSection>
                            <SectionTitle>
                                
                                <Trans>Skill Selection Rules</Trans>
                            </SectionTitle>
                            <EffectItem>
                                <span>
                                    <Trans>Select {template.skillSelectionRules!.count} skills for +{template.skillSelectionRules!.bonus}% bonus</Trans>
                                </span>
                                {template.skillSelectionRules!.maxValue && (
                                    <span>
                                        <Trans>(max {template.skillSelectionRules!.maxValue}%)</Trans>
                                    </span>
                                )}
                            </EffectItem>
                        </EffectsSection>
                    )}

                    {hasBondEffects && (
                        <EffectsSection>
                            <SectionTitle>  
                                <Trans>Bonds</Trans>
                            </SectionTitle>
                            <EffectsList>
                                {renderBondEffect()}
                            </EffectsList>
                        </EffectsSection>
                    )}
                </PreviewContent>
            </PreviewWindow>
        </PreviewContainer>
    );
}

export default TemplateEffectsPreview;
