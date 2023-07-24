import { useTodos } from '../../hooks/useTodos';
import styles from './TodoListTools.module.css';

export const TodoListTools = () => {
	const { handleAddTodo, fieldValueAddTodo, fieldValueAddTodoChanged } = useTodos();

	return (
		<div className={styles.tools}>
			<button className={`${styles.button} ${styles.addButton}`}
							onClick={() => handleAddTodo({text: fieldValueAddTodo})}
							disabled={!fieldValueAddTodoChanged}>ADD
			</button>
		</div>
	)
}
