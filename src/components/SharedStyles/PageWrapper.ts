import styled from 'styled-components';

const PageWrapper = styled.div.attrs<any>({
    'data-component': 'SharedStyles/PageWrapper',
    'data-testid': 'page-wrapper',
})`
	display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.material};
	align-items: center;
	justify-content: center;
  width: clamp(300px, 80vw, 1200px);
  margin-top: 1rem;
  @media (max-width: 768px) {
    width: clamp(200px, 95%, 600px);
  }
`;

export default PageWrapper;