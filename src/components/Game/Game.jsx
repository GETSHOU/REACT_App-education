import PropTypes from 'prop-types';
import { GameLayout } from './GameLayout.jsx'
import { useState } from 'react';

export const Game = () => {
	const FIRST_PLAYER = 'X';
	const SECOND_PLAYER = 'O';

	const STATUS_WIN = 'Победил: ';
	const STATUS_DRAW = 'Ничья!';
	const STATUS_MOVES = 'Ходит: ';

	const WIN_PATTERNS = [
		[0, 1, 2], // Варианты побед по горизонтали
		[3, 4, 5], // Варианты побед по горизонтали
		[6, 7, 8], // Варианты побед по горизонтали
		[0, 3, 6], // Варианты побед по вертикали
		[1, 4, 7], // Варианты побед по вертикали
		[2, 5, 8], // Варианты побед по вертикали
		[0, 4, 8], // Варианты побед по диагонали
		[2, 4, 6], // Варианты побед по диагонали
	];

	const [field, setField] = useState(new Array(9).fill('')); // массив из ячеек
	const [status, setStatus] = useState(STATUS_MOVES); // статус хода
	const [currentPlayer, setCurrentPlayer] = useState(FIRST_PLAYER); // может быть 'o' или 'x'

	const checkWin = (field, currentPlayer) => {
		return WIN_PATTERNS.some((winPattern) => {
			return winPattern.every((cellIndex) => field[cellIndex] === currentPlayer);
		});
	};

	const handlerRestart = () => {
		setField(new Array(9).fill(''));
		setStatus(STATUS_MOVES);
		setCurrentPlayer(FIRST_PLAYER);
	};

	return (
		<GameLayout
			field={field}
			status={status}
			setField={setField}
			checkWin={checkWin}
			statusWin={STATUS_WIN}
			setStatus={setStatus}
			statusDraw={STATUS_DRAW}
			firstPlayer={FIRST_PLAYER}
			secondPlayer={SECOND_PLAYER}
			currentPlayer={currentPlayer}
			handlerRestart={handlerRestart}
			setCurrentPlayer={setCurrentPlayer}
		/>
	);
};

GameLayout.propTypes = {
	field: PropTypes.array,
	status: PropTypes.string,
	setField: PropTypes.func,
	checkWin: PropTypes.func,
	statusWin: PropTypes.string,
	setStatus: PropTypes.func,
	statusDraw: PropTypes.string,
	firstPlayer: PropTypes.string,
	secondPlayer: PropTypes.string,
	currentPlayer: PropTypes.string,
	handlerRestart: PropTypes.func,
	setCurrentPlayer: PropTypes.func,
};
