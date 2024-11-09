import { useState } from 'react';
import { Select, TextInput } from 'react95';
import styled from 'styled-components';


// Building a New Profession
// If none of the professions suit your Agent, use these guidelines to build a new one.
// PROFESSIONAL SKILLS: Pick ten professional skills for the new profession. Divide 400 skill points between them. Add those points to each skill’s starting level. As a rule
// of thumb, professional skills should be 30% to 50%. No professional skill may be higher than 60%.
// BONDS: 3
// CUSTOMIZE: For each additional bond (to a maximum
// of 4), reduce professional skill points by 50. For each bond removed (to a minimum of 1), add 50 profession-
// al skill points.

function BuildProfession() {
    const [skillPoints, setSkillPoints] = useState(400);
    const [bondCount, setBondCount] = useState(3);

    return (
        <div>
            <form>
                <label>Title:</label>
                <TextInput />
            </form>
        </div>
    )
}

export default BuildProfession;