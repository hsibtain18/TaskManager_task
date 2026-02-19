# Task Management System

This is a simple full stack Task Management System built using Laravel for the backend and React with Vite for the frontend.  
Both applications live inside the same repository and run separately.

The goal of this project is to keep things clean, fast, and easy to understand.

---

## Tech Stack

### Backend
- Laravel 12
- MySQL

### Frontend
- React 19
- Vite 7
- TypeScript
- Tailwind CSS
- Axios
- Lucide React

---

## Project Structure

```
task-management-system/
│
├── backend
└── frontend
```

The backend handles the API and database.  
The frontend handles the user interface.

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd task-management-system
```

---

## Backend Setup

Go into the backend folder

```bash
cd backend
```

Install dependencies

```bash
composer install
```

Copy the environment file

```bash
cp .env.example .env
```

Update your database details inside the `.env` file

```
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Generate the app key

```bash
php artisan key:generate
```

Run migrations

```bash
php artisan migrate
```

Only the Task table is required for this project.  
All data is stored inside that table.

Start the backend server

```bash
php artisan serve
```

By default it will run on:

```
http://127.0.0.1:8000
```

Keep this URL for the frontend setup.

---

## Frontend Setup

Open a new terminal and go into the frontend folder

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Open this file:

```
src/dbConnect.ts
```

Update the base URL with your backend server:

```ts
export const BASE_URL = "http://127.0.0.1:8000/api";
```

Start the development server

```bash
npm run dev
```

The frontend usually runs on:

```
http://localhost:5173
```

---

## Features

### Frontend

- Dashboard loads by default
- Add Task button opens a modal
- New tasks start with pending status
- Switch between Grid and Table views
- Edit tasks using the same modal
- Update task status
- Clean and responsive layout

### Backend

- Simple REST API built with Laravel
- Create task
- Get all tasks
- Update task
- Delete task

The Task table stores:
- title  
- description  
- status  

---

## API Routes

```
GET     /api/tasks
POST    /api/tasks
PUT     /api/tasks/{id}
DELETE  /api/tasks/{id}
```

---

## Notes

Make sure MySQL is running before you migrate.  
Run backend and frontend at the same time.  
If you face CORS issues, check your Laravel CORS configuration.

---

## Production Build

Frontend build:

```bash
npm run build
```

Backend optimization:

```bash
php artisan optimize
```

---

## Author

Syed Hassan

---

This project was built for learning and demonstration purposes.
