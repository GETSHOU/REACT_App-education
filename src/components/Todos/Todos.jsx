import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

import { TodoAdd } from '../TodoAdd/TodoAdd';
import { TodoList } from '../TodoList/TodoList';
import { TodoSearch } from '../TodoSearch/TodoSearch';
import { TodoListTools } from '../TodoListTools/TodoListTools';

import { API_TODOS } from '../../api/api';
// json-server --watch ./src/data/todoList.json --delay 500 --port 3004

import styles from './Todos.module.css';

export const Todos = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [dataToDoList, setDataToDoList] = useState([]);
	const [fieldValueAddTodo, setFieldValueAddTodo] = useState('');
	const [fieldValueChanged, setFieldValueChanged] = useState(false);

	const valueSearch = useDebounce(searchQuery);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			await fetch(API_TODOS)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Ошибка запроса!`);
					}

					return response.json()
				})
				.then((data) => setDataToDoList(data))
				.catch((error) => {
					throw new Error(error);
				})
				.finally(() => setIsLoading(false));
		}

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			await fetch(`${API_TODOS}?q=${valueSearch}`)
				.then((response) => response.json())
				.then((data) => {
					setDataToDoList(data);
				})
				.catch((error) => {
					throw new Error(error);
				})
		}

		fetchData();
	}, [valueSearch]);

	const handleChangeAddTodo = ({target}) => {
		if (fieldValueAddTodo !== target.value && target.value !== '') {
			setFieldValueAddTodo(target.value);
			setFieldValueChanged(true);
		} else {
			setFieldValueAddTodo(target.value);
			setFieldValueChanged(false);
		}
	};

	const addTodo = async (payload) => {
		const response = await fetch(API_TODOS, {
			method: 'POST',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify(payload)
		})

		const todo = await response.json();

		setDataToDoList((prevState) => [...prevState, todo]);
		setFieldValueAddTodo('');
		setFieldValueChanged(false);
	};

	const deleteTodo = async (id) => {
		await fetch(`${API_TODOS}/${id}`, {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
		});

		setDataToDoList(dataToDoList.filter((todo) => todo.id !== id));
	};

	const sendUpdatedTodo = async (id, payload) => {
		const todoPosition = dataToDoList.findIndex((todo) => todo.id === id);
		const currentTodo = dataToDoList.find((todo) => todo.id === id);

		if (todoPosition !== -1) {
			const response = await fetch(`${API_TODOS}/${id}`, {
				method: 'PATCH',
				headers: {'Content-Type': 'application/json;charset=utf-8'},
				body: JSON.stringify({...currentTodo, text: payload})
			});

			const updatedTodo = await response.json();
			const copyDataToDoList = dataToDoList.slice();

			copyDataToDoList[todoPosition] = updatedTodo;

			setDataToDoList(copyDataToDoList);
		}
	};

	const sortingTodos = (sortByField) => {
		// Нет проверки sortByField
		const fetchData = async () => {
			await fetch(`${API_TODOS}?_sort=${sortByField}&_order=asc`)
				.then((response) => response.json())
				.then((data) => {
					setDataToDoList(data);
				})
				.catch((error) => {
					throw new Error(error);
				})
		}

		fetchData();
	};

	const handleAddTodo = (payload) => addTodo(payload);
	const handleSearchQuery = ({target}) => setSearchQuery(target.value);
	const handleSort = (sortByField) => sortingTodos(sortByField);

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>My Todo-s</h1>
			<TodoSearch
				searchQuery={searchQuery}
				handleSearchQuery={handleSearchQuery}
			/>
			<div className={styles.toolsWrapper}>
				<TodoAdd
					fieldValueAddTodo={fieldValueAddTodo}
					handleChangeAddTodo={handleChangeAddTodo}
				/>
				<TodoListTools
					handleAddTodo={handleAddTodo}
					fieldValueAddTodo={fieldValueAddTodo}
					fieldValueChanged={fieldValueChanged}
				/>
			</div>
			<button className={styles.sortButton} onClick={() => handleSort('text')}>Sort by a-z</button>
			<div className={styles.divider}></div>
			<TodoList
				isLoading={isLoading}
				handleDelete={deleteTodo}
				dataToDoList={dataToDoList}
				sendUpdatedTodo={sendUpdatedTodo}
			/>
		</div>
	)
}
