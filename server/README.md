## TickTime To-Do — Backend

A simple RESTful API for managing To-Do items. Built with Node.js, Express, and MongoDB (Mongoose).

## Features

-   Create a new todo
-   Get all todos
-   Update todo details(title & description)
-   Toggle done status
-   Delete todo
-   Automatic timestamps
-   Clean & modular API structure

## Tech Stack

| Category  | Tools                 |
| --------- | --------------------- |
| Runtime   | Node.js               |
| Framework | Express               |
| Database  | MongoDB + Mongoose    |
| Language  | JavaScript            |
| Tools     | Nodemon, dotenv, cors |

## Folder Structure

backend/
│── src/
│ ├── models/
│ │ └── todo.model.js
│ ├── routes/
│ │ └── todo.route.js
│ ├── controllers/
│ │ └── todo.controller.js
│ └── index.js
│── package.json
│── .env
└── README.md

## MongoDB Connection Notes

This project uses **MongoDB Atlas** (cloud database).

## Installation & Setup

1. Install dependencies
   npm install

2. Create .env file
   MONGODB_URI=your_mongo_db_uri
   FRONTEND_URL="http://localhost:5173"

3. Start the backend
   npm run dev

## API Endpoints

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| GET    | /api/todos          | Get all TODO items                |
| POST   | /api/todos          | Create a new TODO item            |
| PUT    | /api/todos/:id      | Update a TODO (title/description) |
| PATCH  | /api/todos/:id/done | Toggle the done status            |
| DELETE | /api/todos/:id      | Delete a TODO                     |

## CORS

Configured to allow frontend communication.
