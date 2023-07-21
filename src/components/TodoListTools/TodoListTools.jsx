import styles from './TodoListTools.module.css';

export const TodoListTools = ({
	handleAddTodo,
	fieldValueAddTodo,
	fieldValueChanged
}) => {
	return (
		<div className={styles.tools}>
			<button className={`${styles.button} ${styles.addButton}`}
							onClick={() => handleAddTodo({text: fieldValueAddTodo})}
							disabled={!fieldValueChanged}>ADD
			</button>
		</div>
	)
}
