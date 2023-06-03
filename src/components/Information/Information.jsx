import PropTypes from 'prop-types';
import { InformationLayout } from './InformationLayout';

export const Information = ({ status, statusDraw, currentPlayer }) => {
	return (
		<InformationLayout
			status={status}
			statusDraw={statusDraw}
			currentPlayer={currentPlayer}
		/>
	);
}

InformationLayout.propTypes = {
	status: PropTypes.string,
	statusDraw: PropTypes.string,
	currentPlayer: PropTypes.string,
};
