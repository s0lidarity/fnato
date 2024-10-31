import { Button, NumberInput, Separator, TextInput } from 'react95';
import { useState } from 'preact/hooks';
import styled from 'styled-components';
import { IoPencilOutline, IoCheckmarkSharp } from "react-icons/io5";

import { useSkills } from '../../../../providers/SkillsContext';
import { getSkillNameText } from './utils';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import { SKILL_REMINDERS } from '../../../../types/characterTypes';
import { ProfessionConfigOptions } from '../../../../types/componentTypes';
import Dialogue from '../../../../components/Dialogue/Dialogue';

const SkillInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    min-width: fit-content;
    border: 2px solid ${({ theme }) => theme.borderDark};
`;

const StyledSkillName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 250px;
`;

const StyledSubtypeButton = styled(Button)`
    flex-shrink: 0;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    min-width: unset;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledDialogueContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
`;

const StyledSubtypeInput = styled(TextInput)`
    flex-grow: 1;
    height: 1rem;
`;

const StyledAcceptButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: unset;
    width: 2rem;
    height: 2rem;
`;

const StyledValueContainer = styled.div`
    justify-content: flex-end;
    min-width: 2rem;
`;

const StyledNumberInput = styled(NumberInput)`
    width: 3rem;
    flex-shrink: 0;
`;

const StyledLabel = styled.label`
    white-space: nowrap;
    font-size: 0.9rem;
    align-self: center;
`;

const StyledBonusContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: right;
    min-width: fit-content;
`;

type SkillInputProps = {
    config: ProfessionConfigOptions;
    skillKey: string;
    handleBonusChange: (skillKey: string) => (value: number) => void;
};

function ProfessionSkillInput({ config, skillKey, handleBonusChange }: SkillInputProps) {
    const { skills } = useSkills();
    const [ showModal, setShowModal ] = useState(false);

    return (
        <SkillInputContainer>
            <StyledSkillName>
                <ReminderTooltip 
                    itemKey={skillKey} 
                    labelText={getSkillNameText(skills[skillKey])} 
                    reminders={SKILL_REMINDERS} 
                />
                <span>
                    {/* this span needs to become its own component, it's getting too big */}
                {
                    skills[skillKey].subType && (
                        <StyledSubtypeButton onClick={() => setShowModal(true)}>
                            <IoPencilOutline />
                        </StyledSubtypeButton>
                    )
                }
                {
                    showModal && (
                        <Dialogue
                            title={`${getSkillNameText(skills[skillKey])} Subtype`}
                            show={showModal}
                            setShow={setShowModal}
                        >
                            <StyledDialogueContent>
                                <StyledSubtypeInput
                                    value={skills[skillKey].subType}
                                    onChange={() => console.log('subtype changed')}
                                />
                                <StyledAcceptButton onClick={() => setShowModal(false)}>
                                    <IoCheckmarkSharp />
                                </StyledAcceptButton>
                            </StyledDialogueContent>
                        </Dialogue>
                    )
                }
                </span>
            </StyledSkillName>
            <StyledValueContainer>
                {skills[skillKey].value}
            </StyledValueContainer>
            <Separator orientation="vertical" />
            <StyledBonusContainer>
                <StyledLabel>Bonus</StyledLabel>
                <StyledNumberInput
                    min={0}
                    max={8}
                    width="4rem"
                    value={skills[skillKey].bonus}
                    onChange={handleBonusChange(skillKey)}
                />
            </StyledBonusContainer>
        </SkillInputContainer>
    );
};

export default ProfessionSkillInput;