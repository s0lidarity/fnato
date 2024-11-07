import { render } from 'preact';
import { Router, Route } from 'preact-iso';

import Home from './pages/Home';
import About from './pages/About';
import TheCrucible from './pages/TheCrucible';
import Header from './components/Header';
import GlobalStyles from './GlobalStyles';
import Footer from './components/Footer/Footer';

import Providers from './providers/Providers';

export function App() {
	return (
		<div>
			<GlobalStyles />
			<Providers>
				<Header />
				<main>
					<Router>
						<Route path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/crucible" component={TheCrucible} />
					</Router>
				</main>
				<Footer />
			</Providers>
		</div>
	);
}

render(<App />, document.getElementById('app'));
