
import styles from './TodoItemTools.module.css';

export const TodoItemTools = ({
	id,
	isEdit,
	fieldValue,
	handleEdit,
	handleCancel,
	handleUpdate,
	handleDeleteTodo,
	fieldValueChanged
}) => {
	return (
		<div className={styles.tools}>
			{isEdit
				? null
				: <button className={`${styles.button} ${styles.editButton}`}
									onClick={() => handleEdit()}>EDIT
					</button>
			}
			{isEdit
				? null
				: <button className={`${styles.button} ${styles.deleteButton}`}
									onClick={() => handleDeleteTodo(id)}>DEL
					</button>
			}
			{isEdit
				? <button className={`${styles.button} ${styles.saveButton}`}
									onClick={() => handleUpdate(id, fieldValue)}
									disabled={!fieldValueChanged}>SAVE
					</button>
				: null
			}
			{isEdit
				? <button className={`${styles.button} ${styles.cancelButton}`}
									onClick={() => handleCancel()}>CANCEL
					</button>
				: null
			}
		</div>
	)
}
