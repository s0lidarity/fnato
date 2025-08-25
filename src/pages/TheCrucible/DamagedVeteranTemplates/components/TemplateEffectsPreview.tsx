import { h } from 'preact';
import styled from 'styled-components';
import { Window, WindowContent, WindowHeader } from 'react95';
import { Trans } from '@lingui/react/macro';
import { IoInformationCircle, IoTrendingUp, IoTrendingDown } from 'react-icons/io5';

import { useStats } from '../../../../providers/StatisticsContext';
import { useSkills } from '../../../../providers/SkillsContext';
import { useBonds } from '../../../../providers/BondsContext';
import { DamagedVeteranAdjustment } from '../../../../types/characterTypes';

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
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-size: 0.85rem;
`;

const StatValue = styled.span.attrs<any>({
    'data-testid': 'template-effects-preview-stat-value',
    'data-component': 'TemplateEffectsPreview/StatValue'
})<{ isPositive: boolean }>`
    color: ${props => props.isPositive ? '#00ff00' : '#ff0000'};
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const SkillValue = styled.span.attrs<any>({
    'data-testid': 'template-effects-preview-skill-value',
    'data-component': 'TemplateEffectsPreview/SkillValue'
})`
    color: #00ff00;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const BondValue = styled.span.attrs<any>({
    'data-testid': 'template-effects-preview-bond-value',
    'data-component': 'TemplateEffectsPreview/BondValue'
})<{ isPositive: boolean }>`
    color: ${props => props.isPositive ? '#00ff00' : '#ff0000'};
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const NoEffects = styled.p.attrs<any>({
    'data-testid': 'template-effects-preview-no-effects',
    'data-component': 'TemplateEffectsPreview/NoEffects'
})`
    font-style: italic;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    font-size: 0.85rem;
`;

interface TemplateEffectsPreviewProps {
    template: DamagedVeteranAdjustment;
}

function TemplateEffectsPreview({ template }: TemplateEffectsPreviewProps) {
    const { stats } = useStats();
    const { skills } = useSkills();
    const { bonds } = useBonds();

    const renderStatEffect = (statName: string, adjustment: number | string) => {
        const stat = stats[statName];
        if (!stat) return null;

        let effectValue: number;
        let effectText: string;
        let currentValue: number;

        if (typeof adjustment === 'number') {
            effectValue = adjustment;
            effectText = `${adjustment > 0 ? '+' : ''}${adjustment}`;
            currentValue = stat.score + adjustment;
        } else {
            // Dynamic adjustment based on another stat
            const sourceStat = stats[adjustment];
            effectValue = sourceStat ? -sourceStat.score : 0;
            effectText = `-${sourceStat?.score || 0}`;
            currentValue = stat.score + effectValue;
        }

        return (
            <EffectItem key={statName}>
                <span>{stat.label}:</span>
                <span>{stat.score}</span>
                <StatValue isPositive={effectValue > 0}>
                    {effectValue > 0 ? <IoTrendingUp size={12} /> : <IoTrendingDown size={12} />}
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

        return (
            <EffectItem key={skillName}>
                <span>{skill.label}:</span>
                <span>{skill.value}%</span>
                <SkillValue>
                    <IoTrendingUp size={12} />
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

        return (
            <EffectItem>
                <span>Bonds:</span>
                <span>{currentBonds}</span>
                {remove && (
                    <BondValue isPositive={false}>
                        <IoTrendingDown size={12} />
                        -{remove}
                    </BondValue>
                )}
                {adjustScore && (
                    <BondValue isPositive={adjustScore > 0}>
                        {adjustScore > 0 ? <IoTrendingUp size={12} /> : <IoTrendingDown size={12} />}
                        {adjustScore > 0 ? '+' : ''}{adjustScore}
                    </BondValue>
                )}
                <span>= {currentBonds + (adjustScore || 0) - (remove || 0)}</span>
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
                        <IoInformationCircle size={16} />
                        <span><Trans>Template Effects Preview</Trans></span>
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
                    <IoInformationCircle size={16} />
                    <span><Trans>Template Effects Preview</Trans></span>
                </PreviewHeader>
                <PreviewContent>
                    {hasStatEffects && (
                        <EffectsSection>
                            <SectionTitle>
                                <IoTrendingDown size={14} />
                                <Trans>Stat Changes</Trans>
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
                                <IoTrendingUp size={14} />
                                <Trans>Skill Bonuses</Trans>
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
                                <IoInformationCircle size={14} />
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
                                <IoTrendingDown size={14} />
                                <Trans>Bond Changes</Trans>
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
