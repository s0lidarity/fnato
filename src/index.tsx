import { render } from 'preact';
import { Router, Route } from 'preact-iso';
import { useState, useEffect } from 'preact/hooks';

import Home from './pages/Home';
import About from './pages/About';
import TheCrucible from './pages/TheCrucible';
import Header from './components/Header';
import Footer from './components/Footer/Footer';

import Providers from './providers/Providers';
import Summary from './pages/Summary';
import MobileBanner from './components/MobileBanner/MobileBanner';

export function App() {
	const [showMobileBanner, setShowMobileBanner] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 1200);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return (
		<div>
			<Providers>
				<Header />
					{isMobile && showMobileBanner && (
						<MobileBanner onDismiss={() => setShowMobileBanner(false)} />
					)}
				<main>
					<Router>
						<Route path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/crucible" component={TheCrucible} />
						<Route path="/summary" component={Summary} />
					</Router>
				</main>
				<Footer />
			</Providers>
		</div>
	);
}

render(<App />, document.getElementById('app'));
