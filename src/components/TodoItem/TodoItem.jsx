import { useTodos } from '../../hooks/useTodos';
import { useState, useRef } from 'react';
import styles from './TodoItem.module.css';
import { TodoItemTools } from '../TodoItemTools/TodoItemTools';

export const TodoItem = ({id, currentText}) => {
	const { updateTodo } = useTodos();
	const [isEdit, setEdit] = useState(false);
	const [fieldValueToDoEdit, setFieldValueToDoEdit] = useState(currentText);
	const [fieldValueToDoEditChanged, setFieldValueToDoEditChanged] = useState(false);

	const inputRef = useRef(null);

	const handleUpdateTodo = async (id, updatedTodo) => {
		if (updatedTodo !== currentText) {
			await updateTodo(id, updatedTodo);
			setEdit(false);
			console.log('Данные отправлены!');
		} else {
			setEdit(false);
			setFieldValueToDoEditChanged(false);

			return;
		}

		await updateTodo(id, updatedTodo);

		setEdit(false);
	};

	const handleChangeEditTodo = ({target}) => {
		if (currentText !== target.value && target.value !== '') {
			setFieldValueToDoEdit(target.value);
			setFieldValueToDoEditChanged(true);
		} else {
			setFieldValueToDoEdit(target.value);
			setFieldValueToDoEditChanged(false);
		}
	};

	const handleEdit = () => {
		inputRef.current.focus();
		setEdit(true);
	};

	const handleCancel = () => {
		inputRef.current.focus();
		setFieldValueToDoEdit(currentText);
		setFieldValueToDoEditChanged(false);
		setEdit(false);
	};

	return (
		<li className={!isEdit ? styles.item : `${styles.item} ${styles.itemIsEdit}`}>
			<input type="text"
				ref={inputRef}
				value={!isEdit ? currentText : fieldValueToDoEdit}
				readOnly={!isEdit}
				className={!isEdit ? styles.field : `${styles.field} ${styles.fieldIsEdit}`}
				onChange={handleChangeEditTodo}
			/>
			<TodoItemTools
				id={id}
				isEdit={isEdit}
				handleEdit={handleEdit}
				handleCancel={handleCancel}
				handleUpdateTodo={handleUpdateTodo}
				fieldValueToDoEdit={fieldValueToDoEdit}
				fieldValueToDoEditChanged={fieldValueToDoEditChanged}
			/>
		</li>
	)
}
