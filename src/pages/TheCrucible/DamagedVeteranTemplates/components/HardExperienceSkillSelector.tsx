import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import styled from 'styled-components';
import { Button, Checkbox, ScrollView, Window, WindowContent, WindowHeader } from 'react95';
import { Trans } from '@lingui/react/macro';
import { IoClose, IoInformationCircle } from 'react-icons/io5';

import { useSkills } from '../../../../providers/SkillsContext';
import { useDamagedVeteran } from '../../../../providers/DamagedVeteranContext';
import { Skill } from '../../../../types/characterTypes';
import { MAX_HARDENED_VETERAN_SKILLS, DV_BONUS } from '../../../../constants/gameRules';

const ModalContainer = styled.div.attrs<any>({
    'data-testid': 'hard-experience-skill-selector-modal',
    'data-component': 'HardExperienceSkillSelector/ModalContainer'
})`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalWindow = styled(Window).attrs<any>({
    'data-testid': 'hard-experience-skill-selector-window',
    'data-component': 'HardExperienceSkillSelector/Window'
})`
    max-width: 50rem;
    max-height: 80vh;
    overflow: hidden;
`;

const ModalHeader = styled(WindowHeader).attrs<any>({
    'data-testid': 'hard-experience-skill-selector-header',
    'data-component': 'HardExperienceSkillSelector/Header'
})`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ModalContent = styled(WindowContent).attrs<any>({
    'data-testid': 'hard-experience-skill-selector-content',
    'data-component': 'HardExperienceSkillSelector/Content'
})`
    padding: 1rem;
`;

const Description = styled.p.attrs<any>({
    'data-testid': 'hard-experience-skill-selector-description',
    'data-component': 'HardExperienceSkillSelector/Description'
})`
    margin: 0 0 1rem 0;
    font-size: 0.9rem;
    line-height: 1.4;
    color: ${props => props.theme.materialText};
`;

const SkillsGrid = styled.div.attrs<any>({
    'data-testid': 'hard-experience-skill-selector-grid',
    'data-component': 'HardExperienceSkillSelector/Grid'
})`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
    gap: 0.5rem;
    margin: 1rem 0;
`;

const SkillItem = styled.div.attrs<any>({
    'data-testid': 'hard-experience-skill-selector-item',
    'data-component': 'HardExperienceSkillSelector/Item'
})`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
    background: ${props => props.theme.material};

    &:hover {
        background: ${props => props.theme.materialHover};
        border-color: ${props => props.theme.materialText};
    }
`;

const SelectedSkillBadge = styled.span.attrs<any>({
    'data-testid': 'hard-experience-skill-selector-badge',
    'data-component': 'HardExperienceSkillSelector/Badge'
})`
    background: ${props => props.theme.materialText};
    color: ${props => props.theme.material};
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    font-weight: bold;
    margin-left: auto;
`;

const ControlsContainer = styled.div.attrs<any>({
    'data-testid': 'hard-experience-skill-selector-controls',
    'data-component': 'HardExperienceSkillSelector/Controls'
})`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${props => props.theme.materialText};
`;

const SelectionInfo = styled.div.attrs<any>({
    'data-testid': 'hard-experience-skill-selector-info',
    'data-component': 'HardExperienceSkillSelector/Info'
})`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: ${props => props.theme.materialText};
`;

const ProgressBar = styled.div.attrs<any>({
    'data-testid': 'hard-experience-skill-selector-progress',
    'data-component': 'HardExperienceSkillSelector/Progress'
})`
    width: 6.25rem;
    height: 0.5rem;
    background: ${props => props.theme.material};
    border-radius: 0.25rem;
    overflow: hidden;
    border: 1px solid ${props => props.theme.materialText};
`;

const ProgressFill = styled.div.attrs<any>({
    'data-testid': 'hard-experience-skill-selector-progress-fill',
    'data-component': 'HardExperienceSkillSelector/ProgressFill'
})<{ progress: number }>`
    height: 100%;
    background: ${props => props.theme.materialText};
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
`;

const WarningText = styled.p.attrs<any>({
    'data-testid': 'hard-experience-skill-selector-warning',
    'data-component': 'HardExperienceSkillSelector/Warning'
})`
    color: ${props => props.theme.warningText};
    font-style: italic;
    margin: 0.5rem 0;
    font-size: 0.9rem;
`;



interface HardExperienceSkillSelectorProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

function HardExperienceSkillSelector({ show, onClose, onConfirm }: HardExperienceSkillSelectorProps) {
    const { skills } = useSkills();
    const { selectedHardExperienceSkills, selectSkillsForTemplate } = useDamagedVeteran();
    const [localSelectedSkills, setLocalSelectedSkills] = useState<string[]>([]);

    // Initialize local state when modal opens
    useEffect(() => {
        if (show) {
            setLocalSelectedSkills([...selectedHardExperienceSkills]);
        }
    }, [show, selectedHardExperienceSkills]);

    const handleSkillToggle = (skill: Skill) => {
        if (skill.id === 'occult') {
            // Occult is always included and cannot be deselected
            return;
        }

        const isSelected = localSelectedSkills.includes(skill.id);
        
        if (isSelected) {
            setLocalSelectedSkills(prev => prev.filter(id => id !== skill.id));
        } else if (localSelectedSkills.length < MAX_HARDENED_VETERAN_SKILLS) {
            setLocalSelectedSkills(prev => [...prev, skill.id]);
        }
    };

    const handleConfirm = () => {
        // Apply the skill selections
        localSelectedSkills.forEach(skillId => {
            if (!selectedHardExperienceSkills.includes(skillId)) {
                selectSkillsForTemplate(skillId, selectedHardExperienceSkills);
            }
        });

        // Remove skills that were deselected
        selectedHardExperienceSkills.forEach(skillId => {
            if (!localSelectedSkills.includes(skillId)) {
                selectSkillsForTemplate(skillId, selectedHardExperienceSkills);
            }
        });

        onConfirm();
    };

    const handleCancel = () => {
        setLocalSelectedSkills([...selectedHardExperienceSkills]);
        onClose();
    };

    const progress = (localSelectedSkills.length / MAX_HARDENED_VETERAN_SKILLS) * 100;
    const canConfirm = localSelectedSkills.length === MAX_HARDENED_VETERAN_SKILLS;

    if (!show) return null;

    const selectableSkills = skills.filter(skill => 
        skill.id !== 'unnatural' && skill.id !== 'occult'
    );

    return (
        <ModalContainer>
            <ModalWindow>
                <ModalHeader>
                    <span><Trans>Hard Experience - Skill Selection</Trans></span>
                    <Button onClick={handleCancel} size="sm">
                        <IoClose />
                    </Button>
                </ModalHeader>
                                <ModalContent>
                    <ScrollView style={{ width: '100%', height: '40vh' }}>
                        <Description>
                            <Trans>
                                Select exactly {MAX_HARDENED_VETERAN_SKILLS} skills to receive a +{DV_BONUS}% bonus. 
                                The Occult skill automatically receives this bonus and cannot be deselected.
                            </Trans>
                        </Description>

                        <SelectionInfo>
                            <IoInformationCircle size={16} />
                            <span>
                                <Trans>Selected:</Trans> {localSelectedSkills.length}/{MAX_HARDENED_VETERAN_SKILLS}
                            </span>
                            <ProgressBar>
                                <ProgressFill progress={progress} />
                            </ProgressBar>
                        </SelectionInfo>

                        {localSelectedSkills.length > MAX_HARDENED_VETERAN_SKILLS && (
                            <WarningText>
                                <Trans>You have selected too many skills. Please deselect some to continue.</Trans>
                            </WarningText>
                        )}

                        <SkillsGrid>
                            {/* Always show Occult as selected and disabled */}
                            <SkillItem>
                                <Checkbox
                                    checked={true}
                                    disabled={true}
                                    label="Occult"
                                />
                                <SelectedSkillBadge>+{DV_BONUS}%</SelectedSkillBadge>
                            </SkillItem>

                            {/* Show selectable skills */}
                            {selectableSkills.map(skill => (
                                <SkillItem key={skill.id}>
                                    <Checkbox
                                        checked={localSelectedSkills.includes(skill.id)}
                                        onChange={() => handleSkillToggle(skill)}
                                        label={skill.label}
                                    />
                                    {localSelectedSkills.includes(skill.id) && (
                                        <SelectedSkillBadge>+{DV_BONUS}%</SelectedSkillBadge>
                                    )}
                                </SkillItem>
                            ))}
                        </SkillsGrid>
                    </ScrollView>

                    <ControlsContainer>
                        <Button onClick={handleCancel}>
                            <Trans>Cancel</Trans>
                        </Button>
                        <Button 
                            onClick={handleConfirm} 
                            disabled={!canConfirm}
                            primary
                        >
                            <Trans>Confirm Selection</Trans>
                        </Button>
                    </ControlsContainer>
                </ModalContent>
            </ModalWindow>
        </ModalContainer>
    );
}

export default HardExperienceSkillSelector;
