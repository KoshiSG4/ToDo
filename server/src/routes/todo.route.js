import express from 'express';
import {
	createTodo,
	deleteTodo,
	getTodos,
	toggleDone,
	updateTodo,
} from '../controllers/todo.controller.js';

export const todoRouter = express.Router();

todoRouter.post('/', createTodo);
todoRouter.get('/', getTodos);
todoRouter.put('/:id', updateTodo);
todoRouter.patch('/:id/done', toggleDone);
todoRouter.delete('/:id', deleteTodo);
