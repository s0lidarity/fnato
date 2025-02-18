import { useState } from 'preact/hooks';
import { Button, TextInput } from 'react95';
import styled from 'styled-components';
import { t } from '@lingui/core/macro';
import { i18n } from '@lingui/core';

import { IoPencilOutline, IoCheckmarkSharp } from "react-icons/io5";
import { DEFAULT_SKILLS } from '../../../../types/characterTypes';
import { useSkills } from '../../../../providers/SkillsContext';
import Dialogue from '../../../../components/Dialogue/Dialogue';
import { Skill } from '../../../../types/characterTypes';

const StyledSubtypeInput = styled(TextInput).attrs<any>({
    'data-testid': 'subtype-input',
    'data-component': 'ProfessionSkillInput/StyledSubtypeInput'
})`
    flex-grow: 1;
    height: 1rem;
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

interface SubtypeEditorProps {
    skill: Skill;
}

function SubtypeEditor({ skill }: SubtypeEditorProps) {
    const { setSkillById } = useSkills();
    const [showModal, setShowModal] = useState(false);
    const [localSubType, setLocalSubType] = useState(() => {
        const defaultSkill = DEFAULT_SKILLS.find(s => s.id === skill.id);
        return defaultSkill?.subType === skill.subType ? i18n._(skill.subTypeMsg) : skill.subType || '';
    });

    const handleSubtypeChange = (e: any) => {
        setLocalSubType(e?.target?.value);
    };

    const applySubtype = () => {
        setSkillById(skill.id, { subType: localSubType });
        setShowModal(false);
    };

    if (!skill.subType) return null;

    return (
        <>
            <StyledSubtypeButton onClick={() => setShowModal(true)}>
                <IoPencilOutline />
            </StyledSubtypeButton>
            <Dialogue
                title={t`Enter a Subtype`}
                show={showModal}
                setShow={setShowModal}
            >
                <StyledDialogueContent>
                    <StyledSubtypeInput
                        type="text"
                        value={localSubType}
                        onChange={handleSubtypeChange}
                    />
                    <StyledAcceptButton onClick={applySubtype}>
                        <IoCheckmarkSharp />
                    </StyledAcceptButton>
                </StyledDialogueContent>
            </Dialogue>
        </>
    );
}

export default SubtypeEditor;