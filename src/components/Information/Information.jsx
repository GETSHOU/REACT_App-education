import PropTypes from 'prop-types';
import styles from './Information.module.css';

const InformationLayout = ({ status, statusDraw, currentPlayer }) => {
	return (
		<div className={styles.information}>
			{`${status}${(status !== statusDraw) ? currentPlayer : ''}`}
		</div>
	)
};

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
