import styled from 'styled-components';


// AJS need to verify styling across themes
const StyledQuestionmark = styled.span`
    display: flex;
    margin-left: 0.25rem;
    font-size: 0.75rem;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.materialDark};
    color: ${({ theme }) => theme.materialLight};
    padding: 0.1rem;
    cursor: help;
`;

function TooltipIndicator() {
    return <StyledQuestionmark>?</StyledQuestionmark>;
}

export default TooltipIndicator;