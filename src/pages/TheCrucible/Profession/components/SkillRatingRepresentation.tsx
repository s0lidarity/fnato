// Rating
// What The Rating Represents
// 01% to 19%
// Dabbler.
// 20% to 29%
// A dedicated hobbyist; with a foreign language you can have rudimentary conversations.
// 30% to 39%
// College minor or basic training.
// 40% to 59%
// College major or years of experience; with 50% in a foreign language you have native fluency.
// 60% to 79%
// Decades of experience, or a graduate or doctoral degree.
// 80% to 99%
// A lifetime’s pursuit or multiple doctorates

import { Window, WindowHeader, WindowContent } from 'react95';
import styled from 'styled-components';

const StyledWindow = styled(Window).attrs<any>({
    'data-testid': 'skill-rating-representation',
    'data-component': 'SkillRatingRepresentation/StyledWindow'
})`
    width: fit-conten%;
`;

function SkillRatingRepresentation() {
    return (
        <StyledWindow>
            <WindowHeader>Skill Rating Representation</WindowHeader>
            <WindowContent>
                <p>Skill Rating Representation</p>
            </WindowContent>
        </StyledWindow>
    );
}

export default SkillRatingRepresentation;