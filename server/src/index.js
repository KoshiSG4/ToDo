import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { todoRouter } from './routes/todo.route.js';

dotenv.config();
const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
	cors({
		origin: FRONTEND_URL,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	})
);

app.use(express.json());

async function main() {
	await mongoose.connect(process.env.MONGODB_URI);
	app.use('/api/todos', todoRouter);
}

main()
	.then(() => console.log('Mongodb connected successfully!'))
	.catch((err) => console.log(err));

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
