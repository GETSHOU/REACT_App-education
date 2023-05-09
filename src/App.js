// декларативный стиль - начало
import logo from './logo.svg';
import './App.css';
import { CurrentDateComponent } from './components/CurrentDateComponent';

export const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<CurrentDateComponent />
			</header>
		</div>
	);
};
// декларативный стиль - конец
