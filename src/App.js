import './App.css';
import { Game } from './components/Game/Game.jsx';

export const App = () => {
	return (
		<div className="App">
			<h1 className={'appTitle'}>Игра "Крестики-нолики"</h1>
			<Game />
		</div>
	);
};
