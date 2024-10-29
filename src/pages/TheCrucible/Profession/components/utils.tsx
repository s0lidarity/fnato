export function getSkillNameText(skillKey: string) {
    const tempArray = skillKey.match(/[A-Z][a-z]+/g);
    return tempArray?.join(' ');
}