import PropTypes from 'prop-types';
import { FieldLayout } from './FieldLayout';

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
