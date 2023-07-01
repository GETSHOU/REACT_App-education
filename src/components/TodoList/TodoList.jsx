import { useEffect, useState } from 'react';
import styles from './TodoList.module.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { Loader } from '../Loader/Loader';

const API_TODOS = 'https://jsonplaceholder.typicode.com/todos';

export const TodoList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [dataToDoList, setDataToDoList] = useState([]);

	useEffect(() => {
		setIsLoading(true);

		fetch(API_TODOS)
			.then((rawResponse) => {
				if (!rawResponse.ok) {
					throw new Error(`Ошибка запроса!`);
				}

				return rawResponse.json()
			})
			.then((response) => setDataToDoList(response))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>To Do List</h1>
			<ul className={styles.list}>
				{isLoading
					? <Loader />
					: dataToDoList.map(({id, title}) => (
							<TodoItem key={id} title={title}/>
						))
				}
			</ul>
		</div>
	)
}
