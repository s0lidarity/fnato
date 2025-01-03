
import styled from 'styled-components';
// import { Summary } from "../../Summary";
import { Summary } from "../../Summary";

const SummaryContainer = styled.div.attrs<any>({
    'data-component': 'TheCrucible/Dossier/SummaryContainer',
    'data-testid': 'summary-container',
})`
    color: black;
`;

// AJS starting point, import character sheet and render it here
function Dossier() {
    return(
        <SummaryContainer>
            <Summary />
        </SummaryContainer>
    );
}

export default Dossier;