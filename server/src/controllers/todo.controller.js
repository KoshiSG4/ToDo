import { ToDo } from '../models/todo.model.js';

export const getTodos = async (req, res) => {
	try {
		const todos = await ToDo.find();

		res.status(200).send({
			todos,
		});
	} catch (error) {
		console.log('Error fetching todos', error.message);
		res.status(500).send({ message: 'Failed to fetch todos' });
	}
};

export const createTodo = async (req, res) => {
	try {
		const { _id, ...data } = req.body;
		const newTodo = new ToDo(data);
		await newTodo.save();
		res.status(200).send({
			message: 'Todo created successfully',
			newTodo: newTodo.toObject(),
		});
	} catch (error) {
		console.log('Error creating todo', error);
		res.status(500).send({ message: 'Failed to create todo' });
	}
};

export const updateTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedTodo = await ToDo.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updatedTodo) {
			return res.status(404).send({
				message: 'Cannot Update, todo is not found',
			});
		}
		res.status(200).send({
			message: 'Todo updated successfully',
			updatedTodo: updatedTodo.toObject(),
		});
	} catch (error) {
		console.log('Error updating the todo', error);
		res.status(500).send({ message: 'Failed to update the todo' });
	}
};

export const toggleDone = async (req, res) => {
	try {
		const { id } = req.params;

		const toggleTodo = await ToDo.findById(id);
		if (!toggleTodo) {
			return res.status(404).send({
				message: 'Cannot toggle the status, todo is not found',
			});
		}
		toggleTodo.done = !toggleTodo.done;
		toggleTodo.updatedAt = new Date();

		await toggleTodo.save();

		res.status(200).json({
			message: 'Todo status updated',
			toggleTodo: toggleTodo.toObject(),
		});
	} catch (error) {
		console.log('Error toggling the todo status', error);
		res.status(500).send({ message: 'Failed to toggle the todo status' });
	}
};

export const deleteTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedTodo = await ToDo.findByIdAndDelete(id);
		if (!deletedTodo) {
			return res.status(404).send({
				message: 'Cannot delete! Todo is not found',
			});
		}
		res.status(200).send({
			message: 'Todo deleted successfully',
			deletedTodo,
		});
	} catch (error) {
		console.log('Error deleting the todo', error);
		res.status(500).send({ message: 'Failed to delete the todo' });
	}
};
