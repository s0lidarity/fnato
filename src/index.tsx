import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import { ThemeProvider } from 'styled-components';
import tokyoDark from 'react95/dist/themes/tokyoDark';

import Home from './pages/Home';
import About from './pages/About';
import TheCrucible from './pages/TheCrucible';
import Header from './components/Header';
import GlobalStyles from './GlobalStyles';
import Footer from './components/Footer/Footer';

import { StatsProvider } from './providers/StatisticsContext';

export function App() {
	return (
		<div>
			<GlobalStyles />
			<ThemeProvider theme={tokyoDark}>
				<StatsProvider>
					<LocationProvider>
						<Header />
						<main>
							<Router>
								<Route path="/" component={Home} />
								<Route path="/about" component={About} />
								<Route path="/crucible" component={TheCrucible} />
							</Router>
						</main>
						<Footer />
					</LocationProvider>
				</StatsProvider>
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
