import styles from './TodoItem.module.css';

export const TodoItem = ({title}) => {
	return (
		<li className={styles.item}>
			{title}
		</li>
	)
}
