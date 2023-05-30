import './App.css';
import { useState } from 'react';
import { Field } from './components/Field/Field.jsx';
import { Information } from './components/Information/Information.jsx';

const GameLayout = (props) => {
	return (
		<div className="App">
			<h1 className={'appTitle'}>Игра "Крестики-нолики"</h1>
			<Information />
			<Field fieldValues={props.fieldValues}></Field>
			<button className="buttonStartOver">Начать заново</button>
		</div>
	);
};

export const Game = () => {
	const [currentPlayer, setCurrentPlayer] = useState('x'); // может быть 'o' или 'x'
	const [isGameEnded, setIsGameEnded] = useState(false); // была ли завершена игра
	const [isDraw, setIsDraw] = useState(false); // была ли ничья

	const field = ['', '', '', '', '', '', '', '', ''];

	return <GameLayout fieldValues={field} />;
};
