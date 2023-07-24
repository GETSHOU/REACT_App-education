import TodosProvider from '../../hooks/useTodos';
import { TodoAdd } from '../TodoAdd/TodoAdd';
import { TodoList } from '../TodoList/TodoList';
import { TodoSearch } from '../TodoSearch/TodoSearch';
import { TodoListTools } from '../TodoListTools/TodoListTools';
import { TodosSortingButton } from '../TodosSortingButton/TodosSortingButton';
import styles from './Todos.module.css';

// json-server --watch ./src/data/todoList.json --delay 500 --port 3004
export const Todos = () => {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>My Todo-s</h1>
			<TodosProvider>
				<TodoSearch />
				<div className={styles.toolsWrapper}>
					<TodoAdd />
					<TodoListTools />
				</div>
				<TodosSortingButton />
				<div className={styles.divider}></div>
				<TodoList />
			</TodosProvider>
		</div>
	)
}
