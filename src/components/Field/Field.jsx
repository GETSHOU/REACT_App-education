import PropTypes from 'prop-types';
import styles from './Field.module.css';

const FieldLayout = (props) => {
	return (
		<div className={styles.fieldWrapper}>
			<div className={styles.field}>
				{props.field.map((cellValue, i) => {
					return (
						<button
							key={i}
							className={styles.cell}
							onClick={() => {
								props.handlerMove(i, cellValue);
							}}
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
	const fieldCopy = [...props.field];

	const handlerMove = (i, cellValue) => {
		if (props.status === props.statusWin
			|| props.status === props.statusDraw
			|| cellValue !== '') {
			return;
		}

		fieldCopy[i] = props.currentPlayer;
		props.setField(fieldCopy);

		if(props.checkWin(fieldCopy, props.currentPlayer)) {
			props.setStatus(props.statusWin);
		} else if (!props.checkWin(fieldCopy, props.currentPlayer) && !fieldCopy.includes('')) {
			props.setStatus(props.statusDraw);
		}	else if (props.currentPlayer === props.firstPlayer) {
			props.setCurrentPlayer(props.secondPlayer);
		}	else {
			props.setCurrentPlayer(props.firstPlayer);
		}
	};

	return (
		<FieldLayout
			field={props.field}
			handlerMove={handlerMove}
			currentPlayer={props.currentPlayer}
		/>
	);
}

FieldLayout.propTypes = {
	field: PropTypes.array,
	handlerMove: PropTypes.func,
	currentPlayer: PropTypes.string,
};
