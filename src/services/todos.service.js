import { BASE_URL } from './http.services';

const todosEndPoint = 'todos';

const todosService = {
	get: async () => {
		const response = await fetch(`${BASE_URL}/${todosEndPoint}`);
		const data = await response.json();

		return data;
	},
	delete: async (id) => {
		await fetch(`${BASE_URL}/${todosEndPoint}/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		});
	},
	create: async (payload) => {
		const response = await fetch(`${BASE_URL}/${todosEndPoint}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(payload),
		});
		const data = await response.json();

		return data;
	},
	update: async (id, currentTodo, text) => {
		const response = await fetch(`${BASE_URL}/${todosEndPoint}/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ ...currentTodo, text: text }),
		});

		return response;
	},
	search: async (valueSearch) => {
		const response = await fetch(`${BASE_URL}/${todosEndPoint}?q=${valueSearch}`);
		const data = await response.json();

		return data;
	},
	sorting: async (sortByField) => {
		const response = await fetch(
			`${BASE_URL}/${todosEndPoint}?_sort=${sortByField}&_order=asc`,
		);
		const data = await response.json();

		return data;
	},
};

export default todosService;
