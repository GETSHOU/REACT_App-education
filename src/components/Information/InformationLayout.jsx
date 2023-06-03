import styles from './Information.module.css';

export const InformationLayout = ({ status, statusDraw, currentPlayer }) => {
	return (
		<div className={styles.information}>
			{`${status}${(status !== statusDraw) ? currentPlayer : ''}`}
		</div>
	)
};
