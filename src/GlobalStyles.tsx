import { createGlobalStyle } from 'styled-components';
import { styleReset } from 'react95';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

// Add prop type for the component
interface GlobalStylesProps {
	fontFamily?: 'ms_sans_serif' | 'system' | 'arial';
}

// Convert to prop-accepting component
const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
	${styleReset}
	@font-face {
		font-family: 'ms_sans_serif';
		src: url('${ms_sans_serif}') format('woff2');
		font-weight: 400;
		font-style: normal
	}
	@font-face {
		font-family: 'ms_sans_serif';
		src: url('${ms_sans_serif_bold}') format('woff2');
		font-weight: bold;
		font-style: normal
	}
	body {
		font-family: ${props => {
			console.log('Current font:', props.fontFamily);
			switch(props.fontFamily) {
				case 'system':
					return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
				case 'arial':
					return 'Arial, sans-serif';
				case 'ms_sans_serif':
				default:
					return 'ms_sans_serif, sans-serif';
			}
		}};
	}
	
	/* Apply the font to all form elements as well */
	input, select, textarea, button {
		font-family: inherit;
	}
	main {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export default GlobalStyles;