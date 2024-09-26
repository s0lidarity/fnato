import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { styleReset } from 'react95';
import tokyoDark from  'react95/dist/themes/tokyoDark';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

import Home from './pages/Home';
import About from './pages/About';
import TheCrucible from './pages/TheCrucible';
import Header from './components/Header';
import './style.css';

const GlobalStyles = createGlobalStyle`
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
	body, input, select, textarea {
		font-family: 'ms_sans_serif';
	}
`;

export function App() {
	return (
		<div>
			<GlobalStyles />
				<ThemeProvider theme={tokyoDark}>
				<LocationProvider>
					<Header />
						<main>
							<Router>
								<Route path="/" component={Home} />
								<Route path="/about" component={About} />
								<Route path="/crucible" component={TheCrucible} />
							</Router>
						</main>
				</LocationProvider>
				</ThemeProvider>
		</div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}

render(<App />, document.getElementById('app'));
