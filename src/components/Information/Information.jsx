import styles from './Information.module.css';

const InformationLayout = () => {
	return (
		<div className={styles.information}>Ничья</div>
	)
};

export const Information = (props) => {
	return (
		<InformationLayout />
	);
}
