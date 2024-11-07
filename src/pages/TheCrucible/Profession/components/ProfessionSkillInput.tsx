import { Button, NumberInput, Separator, TextInput } from 'react95';
import { useState } from 'preact/hooks';
import styled from 'styled-components';
import { IoPencilOutline, IoCheckmarkSharp } from "react-icons/io5";

import { useSkills } from '../../../../providers/SkillsContext';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import Dialogue from '../../../../components/Dialogue/Dialogue';
import { Skill } from '../../../../types/characterTypes';

const SkillInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    border: 0.2rem solid ${({ theme }) => theme.borderDark};
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
    skill: Skill;
};

function ProfessionSkillInput({ skill }: SkillInputProps) {
    const { decrementBonusPoint, incrementBonusPoint, skills, setSkillById } = useSkills();
    const [ showModal, setShowModal ] = useState(false);
    // AJS, is localBonus necessary?
    const [ localBonus, setLocalBonus ] = useState(skill.bonus); 
    // keeping localSubType here to avoid mucking with the original skill while it's used elsehwere
    const [ localSubType, setLocalSubType ] = useState(skill.subType || '');


    // AJS: get clarity on how to import the right type for this event
    // console logs show the event coming in as InputEvent
    const handleSubtypeChange = (e: any) => {
        setLocalSubType(e?.target?.value);
    };

    const applySubtype = () => {
        setSkillById(skill.id, { subType: localSubType });
        setShowModal(false);
    };

    type handleBonusChangeProps = {
        bonus: number;
        skillId: string;
    };
    const handleBonusChange = ({ bonus }: handleBonusChangeProps) => {
        const bonusChange = bonus - skill.bonus;
        setLocalBonus(bonus);
        if(bonusChange > 0){
            incrementBonusPoint(skill.id);
        } else {
            decrementBonusPoint(skill.id);
        }
    };

    const skillLabel = `${skill.label} ${skill.subType ? `(${skill.subType})` : ''}`;

    return (
        <SkillInputContainer>
            <StyledSkillName>
                <ReminderTooltip 
                    labelText={skillLabel}
                    reminderText={skill.reminderText} 
                />
                <span>
                    {/* this span needs to become its own component, it's getting too big */}
                {
                    skill.subType && (
                        <StyledSubtypeButton onClick={() => setShowModal(true)}>
                            <IoPencilOutline />
                        </StyledSubtypeButton>
                    )
                }
                {
                    <Dialogue
                        title="Enter a Subtype"
                        show={showModal}
                        setShow={setShowModal}
                    >
                        <StyledDialogueContent>
                            <StyledSubtypeInput
                                key={`${skill.name}-subtype`}
                                type="text"
                                id={`${skill.name}-subtype`}
                                value={localSubType}
                                onChange={(e: any) => handleSubtypeChange(e)}
                            />
                            <StyledAcceptButton onClick={applySubtype}>
                                <IoCheckmarkSharp />
                            </StyledAcceptButton>
                        </StyledDialogueContent>
                    </Dialogue>
                }
                </span>
            </StyledSkillName>
            <StyledValueContainer>
                {skill.value}
            </StyledValueContainer>
            <Separator orientation="vertical" />
            <StyledBonusContainer>
                <StyledLabel>Bonus</StyledLabel>
                <StyledNumberInput
                    min={0}
                    max={8}
                    width="4rem"
                    value={localBonus}
                    onChange={() => handleBonusChange({ bonus: localBonus, skillId: skill.id })}
                />
            </StyledBonusContainer>
        </SkillInputContainer>
    );
};

export default ProfessionSkillInput;