import { useTodos } from '../../hooks/useTodos';
import styles from './TodoItemTools.module.css';

export const TodoItemTools = ({
	id,
	isEdit,
	handleEdit,
	handleCancel,
	handleUpdateTodo,
	fieldValueToDoEdit,
	fieldValueToDoEditChanged
}) => {
	const { handleDeleteTodo } = useTodos();

	return (
		<div className={styles.tools}>
			{!isEdit
				? <>
						<button className={`${styles.button} ${styles.editButton}`}
										onClick={() => handleEdit()}>EDIT
						</button>
						<button className={`${styles.button} ${styles.deleteButton}`}
										onClick={() => handleDeleteTodo(id)}>DEL
						</button>
					</>
				: <>
						<button className={`${styles.button} ${styles.saveButton}`}
										onClick={() => handleUpdateTodo(id, fieldValueToDoEdit)}
										disabled={!fieldValueToDoEditChanged}>SAVE
						</button>
						<button className={`${styles.button} ${styles.cancelButton}`}
										onClick={() => handleCancel()}>CANCEL
						</button>
					</>
			}
		</div>
	)
}
