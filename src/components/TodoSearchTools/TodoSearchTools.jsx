import styles from './TodoSearchTools.module.css';

export const TodoSearchTools = ({handleClearField}) => {
	return (
		<div className={styles.tools}>
			<button className={`${styles.button} ${styles.clearButton}`}
							onClick={() => handleClearField()}
							>CLEAR
			</button>
		</div>
	)
}
