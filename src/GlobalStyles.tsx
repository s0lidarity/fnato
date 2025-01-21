import { createGlobalStyle } from 'styled-components';
import { styleReset } from 'react95';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import defonte from '../public/assets/DeFonte_reduced_Normale.ttf';
import Upheaval from '../public/assets/upheavtt.ttf';

// Add prop type for the component
interface GlobalStylesProps {
	fontFamily?: 'ms_sans_serif' | 'system' | 'arial' | 'defonte' | 'upheaval';
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
	@font-face {
		font-family: 'defonte';
		src: url(${defonte});
		font-weight: normal;
		font-style: normal
	}
	@font-face {
		font-family: 'upheaval';
		src: url(${Upheaval});
		font-weight: normal;
		font-style: normal
	}
	body, input, select, textarea, button {
		font-family: ${props => {

			switch(props.fontFamily) {
				case 'system':
					return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
				case 'arial':
					return 'Arial, sans-serif';
				case 'defonte':
					return 'defonte';
				case 'ms_sans_serif':
					return 'ms_sans_serif';
				case 'upheaval':
					return 'upheaval';
				default:
					return 'ms_sans_serif';
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