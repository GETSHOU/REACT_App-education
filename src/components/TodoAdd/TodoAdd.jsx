import { useTodos } from '../../hooks/useTodos';
import styles from './TodoAdd.module.css';

export const TodoAdd = () => {
	const { handleChangeAddTodo, fieldValueAddTodo } = useTodos();

	return (
		<input
			type="text"
			className={`${styles.field}`}
			value={fieldValueAddTodo}
			onChange={handleChangeAddTodo}
		/>
	)
}
