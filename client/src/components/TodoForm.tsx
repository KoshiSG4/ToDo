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
import { Plus } from 'lucide-react';

interface TodoFormProps {
	onSubmit: (data: Todo) => void;
}

const TodoForm = ({ onSubmit }: TodoFormProps) => {
	const [formData, setFormData] = useState<Todo>({
		_id: '',
		title: '',
		description: '',
		done: false,
	});
	const [openDialog, setOpenDialog] = useState(false);

	const handleChange = (field: keyof Todo, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFormData({ _id: '', title: '', description: '', done: false });
		setOpenDialog(false);
		onSubmit(formData);
	};

	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild>
				<Button
					type="button"
					className="absolute bottom-14 right-14 w-12 h-12 p-0 bg-[#d18e22] rounded-4xl z-50">
					<Plus className="size-7" />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader className="mb-4">
						<DialogTitle className="text-center  text-[#022F56]">
							Add a New To-Do
						</DialogTitle>
						<DialogDescription className="text-center text-sm">
							Add a new todo here. Click Save when you're done.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4">
						<div className="grid gap-3">
							<label className="text-sm text-[#9ba0a3]">
								Title
							</label>
							<input
								id="title"
								value={formData.title}
								onChange={(e) =>
									handleChange('title', e.target.value)
								}
								placeholder="To-do Title"
								required
								className="border p-2 rounded-sm"
							/>
						</div>

						<div className="grid gap-3">
							<label className="text-sm text-[#9ba0a3]">
								Description
							</label>
							<input
								id="description"
								value={formData.description}
								onChange={(e) =>
									handleChange('description', e.target.value)
								}
								placeholder="Add your to-do description"
								className="border p-2 rounded-sm"
							/>
						</div>
					</div>

					<DialogFooter className="mt-8 flex gap-3 justify-end">
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
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default TodoForm;
