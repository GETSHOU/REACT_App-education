import PropTypes from 'prop-types';
import styles from './Information.module.css';

const InformationLayout = (props) => {
	return (
		<div className={styles.information}>
			{`${props.status}${(props.status !== props.statusDraw) ? props.currentPlayer : ''}`}
		</div>
	)
};

export const Information = (props) => {
	return (
		<InformationLayout
			status={props.status}
			statusDraw={props.statusDraw}
			currentPlayer={props.currentPlayer}
		/>
	);
}

InformationLayout.propTypes = {
	status: PropTypes.string,
	statusDraw: PropTypes.string,
	currentPlayer: PropTypes.string,
};
