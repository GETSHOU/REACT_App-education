import { createContext, useContext, useEffect, useState } from "react";
import { useDebounce } from '../hooks/useDebounce';
import todosService from "../services/todos.service";

const TodosContext = createContext(null);

export const useTodos = () => useContext(TodosContext);

const TodosProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [dataTodoList, setDataTodoList] = useState([]);
	const [fieldValueAddTodo, setFieldValueAddTodo] = useState('');
	const [fieldValueSearchQuery, setFieldValueSearchQuery] = useState('');
	const [fieldValueAddTodoChanged, setFieldValueAddTodoChanged] = useState(false);

	const valueSearch = useDebounce(fieldValueSearchQuery);

	const getTodos = async () => {
		try {
			setIsLoading(true);

			const data = await todosService.get();

			setDataTodoList(data);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	const deleteTodo = async (id) => {
		try {
			setIsLoading(true);

			await todosService.delete(id);
			setDataTodoList(dataTodoList.filter((todo) => todo.id !== id));

			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	const addTodo = async (payload) => {
		try {
			setIsLoading(true);

			const data = await todosService.create(payload);

			setDataTodoList((prevState) => [...prevState, data]);
			setFieldValueAddTodo('');
			setFieldValueAddTodoChanged(false);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const updateTodo = async (id, text) => {
		try {
			setIsLoading(true);

			const todoPosition = dataTodoList.findIndex((todo) => todo.id === id);
			const currentTodo = dataTodoList.find((todo) => todo.id === id);

			if (todoPosition !== -1) {
				const data = await todosService.update(id, currentTodo, text.trim());
				const updatedTodo = await data.json();

				const copyDataToDoList = dataTodoList.slice();
				copyDataToDoList[todoPosition] = updatedTodo;

				setDataTodoList(copyDataToDoList);

				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	}

	const sortingTodos = async (sortByField) => {
		try {
			setIsLoading(true);

			const data = await todosService.sorting(sortByField);

			setDataTodoList(data);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getTodos();
	}, []);

	useEffect(() => {
		const searchQuery = async () => {
			try {
				const data = await todosService.search(valueSearch);

				setDataTodoList(data);
			} catch (error) {
				console.log(error);
			}
		}

		searchQuery();

	}, [valueSearch]);

	const handleChangeAddTodo = ({target}) => {
		if (fieldValueAddTodo !== target.value && target.value !== '') {
			setFieldValueAddTodo(target.value);
			setFieldValueAddTodoChanged(true);
		} else {
			setFieldValueAddTodo(target.value);
			setFieldValueAddTodoChanged(false);
		}
	};

	const handleAddTodo = (payload) => addTodo(payload);
	const handleSortTodos = (sortByField) => sortingTodos(sortByField);
	const handleDeleteTodo = (id) => deleteTodo(id);
	const handleSearchQuery = ({target}) => setFieldValueSearchQuery(target.value);

	return (
		<TodosContext.Provider value={{
			isLoading,
			updateTodo,
			dataTodoList,

			handleAddTodo,
			handleSortTodos,
			handleDeleteTodo,
			handleSearchQuery,
			handleChangeAddTodo,

			fieldValueAddTodo,
			fieldValueSearchQuery,

			fieldValueAddTodoChanged
			}}>{ children }
		</TodosContext.Provider>
	)
}

export default TodosProvider;
