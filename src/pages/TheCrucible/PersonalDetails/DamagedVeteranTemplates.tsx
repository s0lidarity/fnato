import styled from 'styled-components';

const DamagedVeteranTemplatesContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-templates-container',
    'data-component': 'PersonalDetails/DamagedVeteranTemplatesContainer',
})`
    display: flex;
    flex-direction: column;
`;

function DamagedVeteranTemplates() {
    return (
        <DamagedVeteranTemplatesContainer>
            <p>Damaged Veteran Templates</p>
        </DamagedVeteranTemplatesContainer>
    );
}

export default DamagedVeteranTemplates;