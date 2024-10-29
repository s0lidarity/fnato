export function getSkillNameText(skillKey: string) {
    if(skillKey.toUpperCase() === skillKey) {
        return skillKey;
    }
    const tempArray = skillKey.match(/[A-Z][a-z]+/g);
    return tempArray?.join(' ');
}