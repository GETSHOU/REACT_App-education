import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './Todos.module.css';
import { TodoList } from '../TodoList/TodoList';
import { TodoListTools } from '../TodoListTools/TodoListTools';
import { TodoSearchTools } from '../TodoSearchTools/TodoSearchTools';
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
		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snapshop) => {
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

	const handleSort = () => setSorted(true);
	const handleAddTodo = (payload) => addTodo(payload);
	const handleClearField = () => setSearchQuery('');
	const handleDeleteTodo = (id) => deleteTodo(id);
	const handleSearchQuery = ({target}) => setSearchQuery(target.value);

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
				valueSearch={valueSearch}
				sendUpdatedTodo={sendUpdatedTodo}
				handleDeleteTodo={handleDeleteTodo}
				todosWithoutSorting={todosWithoutSorting}
			/>
		</div>
	)
}
