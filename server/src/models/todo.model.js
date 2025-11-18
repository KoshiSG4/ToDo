import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
		description: {
			type: String,
			require: false,
		},
		done: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export const ToDo = mongoose.model('ToDo', todoSchema);
