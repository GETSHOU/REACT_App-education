import PropTypes from 'prop-types';
import styles from './Field.module.css';

const FieldLayout = (props) => {
	const { field, handlerMove } = props;

	return (
		<div className={styles.fieldWrapper}>
			<div className={styles.field}>
				{field.map((cellValue, i) => {
					return (
						<button
							key={i}
							className={styles.cell}
							onClick={() => handlerMove(i, cellValue)}
						>
							{cellValue}
						</button>
							);
				})}
			</div>
		</div>
	)
};

export const Field = (props) => {
	const {field, setField, currentPlayer, setCurrentPlayer, firstPlayer, secondPlayer, status, setStatus, statusWin, statusDraw, checkWin } = props;
	const fieldCopy = [...field];

	const handlerMove = (i, cellValue) => {
		if (status === statusWin
			|| status === statusDraw
			|| cellValue !== '') {
			return;
		}

		fieldCopy[i] = currentPlayer;
		setField(fieldCopy);

		if(checkWin(fieldCopy, currentPlayer)) {
			setStatus(statusWin);
		} else if (!checkWin(fieldCopy, currentPlayer) && !fieldCopy.includes('')) {
			setStatus(statusDraw);
		}	else if (currentPlayer === firstPlayer) {
			setCurrentPlayer(secondPlayer);
		}	else {
			setCurrentPlayer(firstPlayer);
		}
	};

	return (
		<FieldLayout
			field={field}
			handlerMove={handlerMove}
		/>
	);
}

FieldLayout.propTypes = {
	field: PropTypes.array,
	handlerMove: PropTypes.func
};
