import styled from 'styled-components';

const PageWrapper = styled.div`
    width: clamp(300px, 80%, 800px);
    margin: 0 auto;
    @media (max-width: 768px) {
        width: clamp(200px, 80%, 600px);
    }
`;

export default PageWrapper;