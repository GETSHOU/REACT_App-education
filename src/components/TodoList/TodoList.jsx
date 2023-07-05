import { useState, useEffect } from 'react';
import styles from './TodoList.module.css';
import { Loader } from '../Loader/Loader';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({
	sorted,
	isLoading,
	valueSearch,
	sendUpdatedTodo,
	handleDeleteTodo,
	todosWithoutSorting
}) => {
	let renderTodos = sorted
		? [...todosWithoutSorting].sort((a, b) => a[1].text.localeCompare(b[1].text))
		: todosWithoutSorting;

	return (
		<div className={styles.wrapper}>
			<ul className={styles.list}>
				{isLoading
					? <Loader />
					: renderTodos
						.filter(([, task]) => task.text.toLowerCase().includes(valueSearch.toLowerCase()))
						.map(([id, {...todo}]) => {
						return (
							<TodoItem
								key={id}
								id={id}
								{...todo}
								sendUpdatedTodo={sendUpdatedTodo}
								handleDeleteTodo={handleDeleteTodo}
							/>
						)
					})
				}
			</ul>
		</div>
	)
}
