import { useEffect, useRef, useState } from 'react';
import TodoItem from '../components/TodoItem';
import type { Todo } from '../types/TodoType';
import TodoForm from '../components/TodoForm';
import { Checkbox } from '../components/ui/checkbox';
import {
	createTodo,
	deleteTodo,
	getTodos,
	toggleTodo,
	updateTodo,
} from '../api/todoApi';
import { Trash2 } from 'lucide-react';
import AnimatedList from '../components/AnimatedList';
import { toast, Toaster } from 'sonner';

const Home = () => {
	const [todoList, setTodoList] = useState<Todo[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const [showFade, setShowFade] = useState(false);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const todos = await getTodos();
				setTodoList(todos);
			} catch (error) {
				console.error('Failed to fetch To-Dos:', error);
			}
		};
		fetchTodos();
	}, []);

	const handleCreateNew = async (todo: Todo) => {
		try {
			const newTodo = await createTodo(todo);
			setTodoList((prev) => [...prev, newTodo]);
		} catch (error) {
			console.error('Failed to create the new To-Do:', error);
		}
	};

	const handleOnSave = async (todo: Todo) => {
		try {
			if (todo) {
				const updatedTodo = await updateTodo(todo);
				if (!updatedTodo) return;
				setTodoList((prev) =>
					prev.map((todo) =>
						todo._id === updatedTodo._id ? updatedTodo : todo
					)
				);
			}
		} catch (error) {
			console.error('Failed to create the new To-Do:', error);
		}
	};

	const handleToggleDone = async (id: string) => {
		try {
			const toggledTodo = await toggleTodo(id);
			setTodoList((prev) =>
				prev.map((todo) =>
					todo._id === toggledTodo._id ? toggledTodo : todo
				)
			);
			if (toggledTodo.done == true) {
				toast.info(`${toggledTodo.title} marked as done`);
			} else {
				toast.info(`${toggledTodo.title} marked as to-do`);
			}
		} catch (error) {
			console.error('Failed to toggle the To-Do:', error);
		}
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteTodo(id);
			setTodoList((prev) => prev.filter((todo) => todo._id !== id));
		} catch (error) {
			console.error('Failed to delete the To-Do item:', error);
		}
	};

	return (
		<div className="relative w-full md:w-[70%] max-w-[1200px]  h-[80vh] mx-auto mt-20 bg-[#DADEE1] rounded-lg shadow z-20">
			<Toaster />
			<div className="flex justify-center items-center border rounded-lg bg-[#02182E] h-16">
				<h1 className="text-2xl font-bold text-[#edba69]">
					TickTime To-Do
				</h1>
			</div>
			<div className="p-8 px-16 flex flex-col h-[calc(80vh-4rem)]">
				<TodoForm onSubmit={handleCreateNew} />

				<div
					className="overflow-y-auto mt-4 pr-3 space-y-2 flex-1 relative"
					style={{
						scrollbarWidth: 'thin',
						scrollbarColor: '#538ba7 #DADEE1',
					}}>
					{[...todoList]
						.sort((a, b) => Number(a.done) - Number(b.done))
						.map((todo) => (
							<div
								className={`flex items-center h-14 space-y-5 my-2 p-2 px-6  rounded-sm ${
									todo.done ? 'bg-[#85C4E4]' : 'bg-[#022F56]'
								} `}
								key={todo._id}>
								<Checkbox
									className="border-[#538ba7] rounded-lg m-0 mr-6 "
									id={todo._id}
									checked={todo.done}
									onCheckedChange={() => {
										handleToggleDone(todo._id);
									}}
								/>
								<div id={todo._id} className={'m-0 w-full'}>
									<TodoItem
										selectedTodo={todo}
										onSave={handleOnSave}
									/>
								</div>
								<Trash2
									className="size-4 text-[#538ba7] ml-5 cursor-pointer hover:text-[#2e4d5c]"
									onClick={() => handleDelete(todo._id)}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Home;
