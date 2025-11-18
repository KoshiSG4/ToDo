import axios from 'axios';
import type { Todo } from '../types/TodoType';
import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Get all the todo lists
export const getTodos = async () => {
	try {
		const response = await axios.get(`${BASE_URL}`);
		const todos = response.data.todos.map((t: any) => ({
			...t,
			createdAt: new Date(t?.createdAt).toISOString().split('T')[0],
			updatedAt: new Date(t?.updatedAt).toISOString().split('T')[0],
		}));
		return todos;
	} catch (error) {
		toast.error('Oops! Could not load your To-Dos. Please try again.');
		console.error('server error!', error);
	}
};

// Create a new todo
export const createTodo = async (todo: Todo) => {
	try {
		const response = await axios.post(`${BASE_URL}`, todo);
		toast.success(
			`${response.data.newTodo.title} - To-Do is created successfully`
		);
		const newTodo = {
			...response.data.newTodo,
			createdAt: new Date(response.data.newTodo?.createdAt)
				.toISOString()
				.split('T')[0],
			updatedAt: new Date(response.data.newTodo?.updatedAt)
				.toISOString()
				.split('T')[0],
		};
		return newTodo;
	} catch (error) {
		toast.error('Failed to add your To-Do. Please try again.');
		console.error('server error!', error);
	}
};

//Update a todo
export const updateTodo = async (todo: Todo) => {
	try {
		const response = await axios.put(`${BASE_URL}/${todo._id}`, todo);
		toast.success(
			`${response.data.updatedTodo.title} - To-Do has been updated!`
		);
		const updatedTodo = {
			...response.data.updatedTodo,
			createdAt: new Date(response.data.updatedTodo?.createdAt)
				.toISOString()
				.split('T')[0],
			updatedAt: new Date(response.data.updatedTodo?.updatedAt)
				.toISOString()
				.split('T')[0],
		};
		return updatedTodo;
	} catch (error: any) {
		if (error.response?.status === 404) {
			toast.error(
				"Hmm... We couldn't find that To-Do. It may have been removed."
			);
			console.error(error);
		} else {
			toast.error('Failed to update your To-Do. Please try again.');
			console.error('server error!', error);
		}
		return null;
	}
};

//Toggle done status
export const toggleTodo = async (id: string) => {
	try {
		const response = await axios.patch(`${BASE_URL}/${id}/done`);
		const toggleTodo = {
			...response.data.toggleTodo,
			createdAt: new Date(response.data.toggleTodo?.createdAt)
				.toISOString()
				.split('T')[0],
			updatedAt: new Date(response.data.toggleTodo?.updatedAt)
				.toISOString()
				.split('T')[0],
		};
		return toggleTodo;
	} catch (error: any) {
		if (error.response?.status === 404) {
			toast.error("We couldn't find that To-Do to update its status.");
			console.error(error);
		} else {
			toast.error('Failed to update the To-Do status. Please try again.');
			console.error('server error!', error);
		}
		return null;
	}
};

//Delete a todo
export const deleteTodo = async (id: string) => {
	try {
		const response = await axios.delete(`${BASE_URL}/${id}`);
		toast.success('To-Do deleted successfully!');
		return response.data;
	} catch (error: any) {
		if (error.response?.status === 404) {
			toast.error("We couldn't find that To-Do to delete it.");
			console.error(error);
		} else {
			toast.error('Failed to delete the To-Do. Please try again.');
			console.error('server error!', error);
		}
		return null;
	}
};
