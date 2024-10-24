import styled from 'styled-components';

const StatInputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
	border-color: ${({ theme }) => theme.borderDark};
	border-style: solid;
	border-width: 0.25rem;
`;

export default StatInputContainer;