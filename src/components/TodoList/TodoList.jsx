import { useTodos } from '../../hooks/useTodos';
import { Loader } from "../Loader/Loader";
import { TodoItem } from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

export const TodoList = () => {
	const { dataTodoList, isLoading } = useTodos();

	return (
		<div className={styles.wrapper}>
			<ul className={styles.list}>
				{ isLoading
					? <Loader />
					: <>
							{dataTodoList.map((todo) => {
								return (
									<TodoItem
										key={todo.id}
										id={todo.id}
										currentText={todo.text}
									/>
								)}
							)}
						</>
				}
			</ul>
		</div>
	)
}
