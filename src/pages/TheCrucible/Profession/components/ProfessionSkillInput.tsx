import { Button, NumberInput, Separator, TextInput } from 'react95';
import { useState } from 'preact/hooks';
import styled from 'styled-components';
import { IoPencilOutline, IoCheckmarkSharp } from "react-icons/io5";

import { useSkills } from '../../../../providers/SkillsContext';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import Dialogue from '../../../../components/Dialogue/Dialogue';
import { Skill } from '../../../../types/characterTypes';

const SkillInputContainer = styled.div.attrs<any>({
    'data-testid': 'skill-input-container',
    'data-component': 'ProfessionSkillInput/SkillInputContainer'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    border: 0.2rem solid ${({ theme }) => theme.borderDark};
`;

const StyledSkillName = styled.div.attrs<any>({
    'data-testid': 'skill-name',
    'data-component': 'ProfessionSkillInput/StyledSkillName'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 250px;
`;

const StyledSubtypeButton = styled(Button).attrs<any>({
    'data-testid': 'subtype-button',
    'data-component': 'ProfessionSkillInput/StyledSubtypeButton'
})`
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

const StyledDialogueContent = styled.div.attrs<any>({
    'data-testid': 'dialogue-content',
    'data-component': 'ProfessionSkillInput/StyledDialogueContent'
})`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
`;

const StyledSubtypeInput = styled(TextInput).attrs<any>({
    'data-testid': 'subtype-input',
    'data-component': 'ProfessionSkillInput/StyledSubtypeInput'
})`
    flex-grow: 1;
    height: 1rem;
`;

const StyledAcceptButton = styled(Button).attrs<any>({
    'data-testid': 'accept-button',
    'data-component': 'ProfessionSkillInput/StyledAcceptButton'
})`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: unset;
    width: 2rem;
    height: 2rem;
`;

const StyledValueContainer = styled.div.attrs<any>({
    'data-testid': 'value-container',
    'data-component': 'ProfessionSkillInput/StyledValueContainer'
})`
    justify-content: flex-end;
    min-width: 2rem;
`;

const StyledNumberInput = styled(NumberInput).attrs<any>({
    'data-testid': 'number-input',
    'data-component': 'ProfessionSkillInput/StyledNumberInput'
})`
    width: 3rem;
    flex-shrink: 0;
`;

const StyledLabel = styled.label.attrs<any>({
    'data-testid': 'label',
    'data-component': 'ProfessionSkillInput/StyledLabel'
})`
    white-space: nowrap;
    font-size: 0.9rem;
    align-self: center;
`;

const StyledBonusContainer = styled.div.attrs<any>({
    'data-testid': 'bonus-container',
    'data-component': 'ProfessionSkillInput/StyledBonusContainer'
})`
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
    const { adjustBonus, calculateSkillValue, setSkillById, bonusPointsRemaining } = useSkills();
    const [ showModal, setShowModal ] = useState(false);
    const [ localSubType, setLocalSubType ] = useState(skill.subType || '');

    const handleSubtypeChange = (e: any) => {
        setLocalSubType(e?.target?.value);
    };

    const applySubtype = () => {
        setSkillById(skill.id, { subType: localSubType });
        setShowModal(false);
    };

    const handleBonusChange = (value: number) => {
        // maybe send a signal to SkillForm to update NoPointsWarning2
        adjustBonus(skill.id, value);
    };

    // AJS start here bonus assignment should only be rendered if a user does not want to use a preset skill point package

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
                {calculateSkillValue(skill.id)}
            </StyledValueContainer>
            <Separator orientation="vertical" />
            <StyledBonusContainer>
                <StyledLabel>Bonus</StyledLabel>
                <StyledNumberInput
                    min={0}
                    max={Math.min(8, (bonusPointsRemaining || 0) + (skill.bonus || 0))}
                    width="4rem"
                    value={skill.bonus || 0}
                    onChange={(value) => handleBonusChange(value)}
                />
            </StyledBonusContainer>
        </SkillInputContainer>
    );
};

export default ProfessionSkillInput;