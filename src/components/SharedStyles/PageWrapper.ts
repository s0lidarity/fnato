import styled from 'styled-components';

const PageWrapper = styled.div`
	display: block;
	align-items: center;
	justify-content: center;
  width: clamp(300px, 80vw, 800px);
  margin: 0 auto;
  @media (max-width: 768px) {
    width: clamp(200px, 95%, 600px);
  }
`;

export default PageWrapper;