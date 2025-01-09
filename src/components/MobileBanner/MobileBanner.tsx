import styled from 'styled-components';
import { Button, Window, WindowContent, WindowHeader } from 'react95';
import { IoCloseSharp } from 'react-icons/io5';

interface MobileBannerProps {
	onDismiss: () => void;
}

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.8);
	z-index: 999;
`;

const BannerWindow = styled(Window)`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1000;
	min-width: 300px;
	max-width: 90%;
	background: ${({ theme }) => theme.material};
	backdrop-filter: none;
	opacity: 1;
`;

const StyledWindowHeader = styled(WindowHeader)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${({ theme }) => theme.headerBackground};
`;

const StyledWindowContent = styled(WindowContent)`
	background: ${({ theme }) => theme.material};
	color: ${({ theme }) => theme.materialText};
	text-align: center;
	padding: 1rem;
	font-size: 14px;
	opacity: 1;
`;

export default function MobileBanner({ onDismiss }: MobileBannerProps) {
	return (
		<>
			<Overlay onClick={onDismiss} />
			<BannerWindow>
				<StyledWindowHeader>
					<span>Warning</span>
					<Button onClick={onDismiss}>
						<IoCloseSharp />
					</Button>
				</StyledWindowHeader>
				<StyledWindowContent>
					This website is optimized for desktop viewing. Mobile experience may be limited.
				</StyledWindowContent>
			</BannerWindow>
		</>
	);
}
