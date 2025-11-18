import { useState } from 'react';
import type { Todo } from '../types/TodoType';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Edit } from 'lucide-react';

interface TodoFormProps {
	selectedTodo: Todo;
	onSave: (data: Todo) => void;
}

const TodoItem = ({ onSave, selectedTodo }: TodoFormProps) => {
	const [formData, setFormData] = useState<Todo>(selectedTodo);
	const [openDialog, setOpenDialog] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const toggleEdit = () => {
		setEditMode((prev) => {
			const newMode = !prev;

			if (!newMode && selectedTodo) {
				setFormData(selectedTodo);
			}
			return newMode;
		});
	};

	const handleChange = (field: keyof Todo, value: string) => {
		setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setOpenDialog(false);
		onSave(formData);
	};
	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild>
				<button
					className={`text-[#d09434] w-full text-left flex-1 ${
						selectedTodo.done ? 'line-through text-gray-500' : ''
					}`}>
					{selectedTodo?.title}
				</button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader className="mb-4">
						<DialogTitle className="text-center  text-[#022F56]">
							{selectedTodo?.title}{' '}
							<span className="ml-2 text-sm text-gray-500">
								- {formData?.done ? 'Done' : 'To Do'}
							</span>
						</DialogTitle>

						{editMode && (
							<DialogDescription className="text-center text-sm">
								Edit your todo here. Click save when you&apos;re
								done.
							</DialogDescription>
						)}
					</DialogHeader>
					<div className="grid gap-4">
						{editMode && (
							<div className="grid gap-3">
								<label className="text-sm text-[#9ba0a3]">
									Title:
								</label>

								<input
									id="title"
									name="title"
									placeholder="To-do Title"
									value={formData?.title}
									onChange={(e) =>
										handleChange('title', e.target.value)
									}
									required
									className="border p-2 rounded-sm"
								/>
							</div>
						)}
						<div className="grid gap-3">
							{editMode ? (
								<>
									<label className="text-sm text-[#9ba0a3]">
										Description:
									</label>
									<input
										id="description"
										name="description"
										placeholder="Add your to-do description"
										value={formData?.description}
										onChange={(e) =>
											handleChange(
												'description',
												e.target.value
											)
										}
										className="border p-2 rounded-sm"
									/>
								</>
							) : (
								<p className="text-[#0e78b6] rounded-sm my-4 text-center">
									{formData?.description}
								</p>
							)}
						</div>
						<div className="flex justify-between items-center w-full">
							<div className="flex">
								<span className="text-sm mr-2 text-gray-500">
									Created At:
								</span>
								<p className="text-sm text-gray-900">
									{formData?.createdAt}
								</p>
							</div>

							<div className="flex text-right pr-2">
								<span className="text-sm mr-2 text-gray-500">
									Updated At:
								</span>
								<p className="text-sm text-gray-900">
									{formData?.updatedAt}
								</p>
							</div>
						</div>
					</div>
					<DialogFooter className="mt-8 flex gap-3 justify-end">
						{editMode ? (
							<>
								<DialogClose asChild>
									<Button className="cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors">
										Cancel
									</Button>
								</DialogClose>

								<Button
									type="submit"
									className="cursor-pointer bg-[#022F56] text-white px-4 py-2 rounded hover:bg-[#034884] active:bg-[#034884] transition-colors">
									Save
								</Button>
							</>
						) : (
							<Edit
								className="text-[#b7babb] size-4 cursor-pointer"
								onClick={() => toggleEdit()}
							/>
						)}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default TodoItem;
