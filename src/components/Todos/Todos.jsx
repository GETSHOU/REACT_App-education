import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './Todos.module.css';
import { TodoList } from '../TodoList/TodoList';
import { TodoListTools } from '../TodoListTools/TodoListTools';
import { TodoSearchTools } from '../TodoSearchTools/TodoSearchTools';

// import { API_TODOS } from '../../api/api';
// json-server --watch ./src/data/todoList.json --delay 500 --port 3004

// ref - ссылка на базу банных
// onValue - функция-подписчик на изменение значения в базе данных
import { ref, set, push, remove, onValue } from 'firebase/database';
import { db } from '../../firebase';


export const Todos = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [fieldValue, setFieldValue] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [dataToDoList, setDataToDoList] = useState({});
	const [sorted, setSorted] = useState(false);
	const [fieldValueChanged, setFieldValueChanged] = useState(false);
	const [todosWithoutSorting, setTodosWithoutSorting] = useState([]);

	const valueSearch = useDebounce(searchQuery);

	const handleChange = ({target}) => {
		if (fieldValue !== target.value && target.value !== '') {
			setFieldValue(target.value);
			setFieldValueChanged(true);
		} else {
			setFieldValue(target.value);
			setFieldValueChanged(false);
		}
	};

	useEffect(() => {
		const todosDbRef = ref(db, 'todos'); // получить доступ к таблице todos

		// return позволит отписываться от подписчика onValue каждый раз, когда наш компонент будет удаляться
		return onValue(todosDbRef, (snapshop) => { // слепок от данных, которые приходит из таблицы
			const loadedTodos = snapshop.val() || {};

			setDataToDoList(loadedTodos);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		setTodosWithoutSorting(Object.entries(dataToDoList))
	}, [dataToDoList]);

	const addTodo = async (payload) => {
		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, {
			text: payload
		})

		setFieldValue('');
		setFieldValueChanged(false);
	};

	const deleteTodo = async (id) => {
		const todosDbRef = ref(db, `todos/${id}`);

		remove(todosDbRef);
	};

	const sendUpdatedTodo = async (id, payload) => {
		const todosDbRef = ref(db, `todos/${id}`);

		set(todosDbRef, {
			text: payload
		})
	};

	const handleAddTodo = (payload) => {
		addTodo(payload)
	};
	const handleDeleteTodo = (id) => {
		deleteTodo(id);
	};
	const handleSearchQuery = ({target}) => {
		setSearchQuery(target.value)
	};
	const handleSort = () => {
		setSorted(true);
	};
	const handleClearField = () => {
		setSearchQuery('');
	};

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>My Todo-s</h1>
			<div className={styles.toolsWrapper}>
				<input type="text"
							 className={`${styles.field} ${styles.fieldSearch}`}
							 placeholder='Search...'
							 value={searchQuery}
							 onChange={handleSearchQuery}/>
				<TodoSearchTools
					handleClearField={handleClearField}
				/>
			</div>
			<div className={styles.toolsWrapper}>
				<input type="text"
							 className={styles.field}
							 value={fieldValue}
							 onChange={handleChange}/>
				<TodoListTools
					fieldValue={fieldValue}
					handleAddTodo={handleAddTodo}
					fieldValueChanged={fieldValueChanged}
				/>
			</div>
			<button className={styles.sortButton} onClick={(e) => handleSort(e)}>Sort by a-z</button>
			<div className={styles.divider}></div>
			<TodoList
				sorted={sorted}
				isLoading={isLoading}
				searchQuery={searchQuery}
				valueSearch={valueSearch}
				dataToDoList={dataToDoList}
				sendUpdatedTodo={sendUpdatedTodo}
				handleDeleteTodo={handleDeleteTodo}
				todosWithoutSorting={todosWithoutSorting}
			/>
		</div>
	)
}
