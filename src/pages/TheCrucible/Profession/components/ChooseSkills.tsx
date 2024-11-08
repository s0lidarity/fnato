import { useState } from 'preact/hooks';
import { Skill } from '../../../../types/characterTypes';
import styled from 'styled-components';
import { Checkbox, GroupBox } from 'react95';

import { IProfession } from '../../../../types/characterTypes';
import { useSkills } from '../../../../providers/SkillsContext';

type ChooseSkillsProps = {
    profession: IProfession;
};

function ChooseSkills({ profession }: ChooseSkillsProps) {
    // need to track chosen skills and remaining choices
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
    const [remainingChoices, setRemainingChoices] = useState(profession?.chosenSkillCount || 0);

    return (
        <GroupBox>
            {profession.choosableSkills.map((skill) => {
                return <span>{skill.label}</span>;
            })}
        </GroupBox>
    );
}

export default ChooseSkills;