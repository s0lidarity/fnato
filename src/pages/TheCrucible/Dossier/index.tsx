
import styled from 'styled-components';
import { Summary2 } from "../../Summary/Summary2";

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
            <Summary2 />
        </SummaryContainer>
    );
}

export default Dossier;