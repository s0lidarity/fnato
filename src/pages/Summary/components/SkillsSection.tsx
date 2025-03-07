import { 
    SkillsSection as StyledSkillsSection,
    SkillsGrid,
    SkillItem,
    SkillsLabel
} from '../styles/Skills.styles';
import { VerticalHeader } from '../styles/CharacterSheet.styles';
import { Skill } from '../../../types/characterTypes';

interface SkillsSectionProps {
    skills: Skill[];
    calculateSkillValue: (skillId: string) => number;
}

export const SkillsSection = ({ 
    skills,
    calculateSkillValue 
}: SkillsSectionProps) => {
    return (
        <StyledSkillsSection>
            <VerticalHeader>Applicable Skill Sets</VerticalHeader>
            <div>
                <SkillsGrid $skillCount={skills.length}>
                    {skills.map((skill) => (
                        <SkillItem key={`${skill.id}-${skill.name}-${skill.subType}`}>
                            <input 
                                type="checkbox" 
                                checked={false}
                                readOnly
                            />
                            <span>
                                {`${skill.name}${skill.subType ? ` (${skill.subType})` : ''}`} ({calculateSkillValue(skill.id)}%)
                            </span>
                        </SkillItem>
                    ))}
                </SkillsGrid>
                <SkillsLabel>
                    Check a skill when you fail a skill check. After a session, add 1d4 to each checked skill and erase the check.
                </SkillsLabel>
            </div>
        </StyledSkillsSection>
    );
};

export default SkillsSection; 