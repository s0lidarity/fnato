import { createGlobalStyle } from 'styled-components';
import { styleReset } from 'react95';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import defonte from './assets/fonts/DeFonte_reduced_Normale.ttf';
import Upheaval from './assets/fonts/upheavtt.ttf';
import OpenDyslexic from './assets/fonts/OpenDyslexic-Regular.woff';
import OpenDyslexicW2 from './assets/fonts/OpenDyslexic-Regular.woff2';

// Add prop type for the component
interface GlobalStylesProps {
	fontFamily?: 'ms_sans_serif' | 'system' | 'arial' | 'defonte' | 'upheaval' | 'OpenDyslexic';
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
	@font-face {
		font-family: 'OpenDyslexic';
		src: 	url(${OpenDyslexicW2}) format('woff2'),
				url(${OpenDyslexic}) format('woff');
		font-weight: normal;
		font-style: normal
	}

	/* Windows 95 cursor styles */
	* {
		cursor: url('/assets/cursors/arrow.cur'), default;
	}

	a, button, [role="button"], [role="tab"], [role="presentation"],
	select, label, input[type="radio"], input[type="checkbox"] {
		cursor: url('/assets/cursors/Finger.cur'), pointer;
	}

	input[type="text"],
	input[type="number"],
	input[type="password"],
	textarea {
		cursor: url('/assets/cursors/Pencil.cur'), text;
	}

	.resizable {
		cursor: url('/assets/cursors/Cursor_4.cur'), se-resize;
	}

	.loading {
		cursor: url('/assets/cursors/Wait.cur'), wait;
	}

	.help {
		cursor: url('/assets/cursors/help_win95.cur'), help;
	}

	a[href^="http"], a[target="_blank"] {
		cursor: url('/assets/cursors/RocketG.cur'), pointer;
	}

	/* Font styles */
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
				case 'OpenDyslexic':
					return 'OpenDyslexic';
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