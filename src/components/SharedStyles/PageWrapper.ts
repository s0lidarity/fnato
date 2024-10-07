import styled from 'styled-components';

const PageWrapper = styled.div`
	display: block;
  background: ${({ theme }) => theme.material};
	align-items: center;
	justify-content: center;
  width: clamp(300px, 80vw, 800px);
  margin-top: 1rem;
  @media (max-width: 768px) {
    width: clamp(200px, 95%, 600px);
  }
`;

export default PageWrapper;