import styles from './TodoAdd.module.css';

export const TodoAdd = ({fieldValueAddTodo, handleChangeAddTodo}) => {
	return (
		<input
			type="text"
			className={`${styles.field}`}
			value={fieldValueAddTodo}
			onChange={handleChangeAddTodo}
		/>
	)
}
