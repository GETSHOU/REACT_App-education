import styles from './Game.module.css';
import { Field } from '../Field/Field.jsx';
import { Information } from '../Information/Information.jsx';

export const GameLayout = (props) => {
	const {
		field,
		status,
		setField,
		checkWin,
		statusWin,
		setStatus,
		statusDraw,
		firstPlayer,
		secondPlayer,
		currentPlayer,
		handlerRestart,
		setCurrentPlayer,
	} = props;

	return (
		<div className={styles.gameWrapper}>
			<Information
				status={status}
				statusDraw={statusDraw}
				currentPlayer={currentPlayer}
			/>
			<Field
				field={field}
				status={status}
				setField={setField}
				checkWin={checkWin}
				statusWin={statusWin}
				setStatus={setStatus}
				statusDraw={statusDraw}
				firstPlayer={firstPlayer}
				secondPlayer={secondPlayer}
				currentPlayer={currentPlayer}
				setCurrentPlayer={setCurrentPlayer}
			/>
			<button className={styles.buttonStartOver} onClick={handlerRestart}>
				Начать заново
			</button>
		</div>
	);
};
