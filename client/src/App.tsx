import './App.css';
import Home from './pages/Home';
import bgImage from './assets/background.jpg';
import { Toaster } from './components/ui/sonner';

function App() {
	return (
		<div
			style={{
				backgroundImage: `url(${bgImage})`,
				backgroundSize: 'auto',
				backgroundRepeat: 'repeat',
				backgroundPosition: 'center',
				height: '100vh',
				width: '100%',
			}}>
			<div className="absolute inset-0 bg-black/70">
				<Home />
			</div>
		</div>
	);
}

export default App;
