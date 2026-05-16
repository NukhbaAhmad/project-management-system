# 📌 Project Management System

A modern, full‑stack project management application that helps teams organize projects and tasks. Built as a **monorepo** using **npm workspaces** for seamless development of both the React frontend and the Express backend.

---

## 📖 Description

This system provides a complete solution for managing projects and associated tasks. Users can:

- Register / log in securely (JWT authentication)
- Create, edit, soft‑delete, and restore projects
- Create, edit, delete, restore tasks (with status: pending, in progress, completed)
- Filter and paginate through projects and tasks
- View dashboard statistics (total projects, tasks, completed/pending/in‑progress tasks)
- Update profile information (name, username)
- Permanently delete account (with all related data)
- Automatic session expiry handling (redirect to login)

The frontend is built with **React**, **TypeScript**,**axios**, **TanStack Query**, and **Tailwind CSS**.  
The backend is a **REST API** built with **Express**, **MongoDB**, **JWT**, and **Joi** validation.

---

## 🖥️ Frontend

### ✨ Features

- User authentication (login / register) with protected routes
- Dashboard with key metrics
- Projects management:
  - List all projects (paginated, search by title, show/hide trashed)
  - Create, edit, soft‑delete, restore project
  - Restore all tasks of a trashed project
- Tasks management:
  - List tasks filtered by project, status, title, and trashed state
  - Create, edit, soft‑delete, restore task
  - Task status badges (pending, in progress, completed)
- Profile page:
  - View and update name / username (email is read‑only)
  - Delete account with confirmation modal
- Reusable components: `Pagination`, `ConfirmModal`, `ProjectFormModal`, `TaskFormModal`, `Filters`
- Debounced search (800ms) to avoid excessive API calls
- Toast notifications (`react‑hot‑toast`)
- Session expired interceptor – auto logout on 401

### 🧰 Stack

| Technology      | Purpose                     |
| --------------- | --------------------------- |
| React 18        | UI library                  |
| TypeScript      | Type safety                 |
| TanStack Query  | Server state & caching      |
| React Router v6 | Routing & protected routes  |
| Axios           | HTTP client + interceptors  |
| Tailwind CSS    | Styling (custom dark theme) |
| react‑hot‑toast | Notifications               |
| Vite            | Build tool & dev server     |

---

## ⚙️ Backend

### ✨ Features

- **Authentication** – Register / Login with JWT tokens
- **Projects** – Full CRUD, soft delete (trash), restore, restore all tasks
- **Tasks** – Full CRUD, soft delete, restore, filter by project, status, title
- **Dashboard** – Stats: total projects, total tasks, completed/pending/in‑progress tasks
- **Users** – Get single user, update name/username, delete user (cascade to projects & tasks)
- **Validation** – Request data validated with Joi
- **Error handling** – Consistent API response structure
- **Security** – JWT middleware, password hashing (bcrypt), input sanitisation

### 🧰 Stack

| Technology         | Purpose                  |
| ------------------ | ------------------------ |
| Node.js            | Runtime environment      |
| Express            | Web framework            |
| MongoDB + Mongoose | Database & ODM           |
| JWT (jsonwebtoken) | Authentication           |
| bcryptjs           | Password hashing         |
| Joi                | Schema validation        |
| dotenv             | Environment variables    |
| Nodemon            | Development auto‑restart |

---

## 📁 Monorepo Structure

project-management-system/
├── backend/ # Express API
│ ├── src/
│ │ ├── controllers/ # Route handlers
│ │ ├── models/ # Mongoose models
│ │ ├── routes/ # API endpoints
│ │ ├── middlewares/ # Auth, validation, error handler
│ │ └── validations/ # Joi schemas
│ ├── .env # Backend environment variables
│ └── package.json
├── frontend/ # React app (Vite)
│ ├── src/
│ │ ├── api/ # Axios services
│ │ ├── components/ # Reusable UI components
│ │ ├── hooks/ # React Query hooks
│ │ ├── pages/ # Route pages (Dashboard, Projects, Tasks, Profile)
│ │ ├── types/ # TypeScript type definitions
│ │ └── utils/ # Helpers, protected route, event bus
│ ├── .env # Frontend environment variables
│ └── package.json
├── package.json # Root workspace config
└── README.md # This file

## 🚀 How to Run the Project

### Prerequisites

- Node.js **18+** (npm 9+ recommended)
- MongoDB instance (local or Atlas)

### 1. Clone the repository

````bash
1. git clone https://github.com/your-username/project-management-system.git
2. cd project-management-system
3. Install dependencies (from root)
bash
npm install
This will automatically install dependencies for both backend and frontend workspaces.

4. Set up environment variables
Backend (backend/.env):
Frotend (frontend/.env):

bash
npm run dev
This starts both the backend and frontend concurrently.

Backend: http://localhost:5000

Frontend: http://localhost:5173 (default Vite port)

To run each separately:

bash
npm run dev:backend   # only backend
npm run dev:frontend  # only frontend
5. Build for production
bash
npm run build
Then start the built applications:

bash
npm run start:backend
npm run start:frontend
6. Default test user
If the backend seeds initial data, you can log in with:

Username/Email: testuser@example.com (or use the registration form)

Password: password123

📡 API Endpoints (Backend)
All endpoints are prefixed with /api/v1.

Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login (returns JWT)
GET	/project	List projects (paginated, filter)
POST	/project	Create project
GET	/project/:id	Get single project
PATCH	/project/:id	Update project
DELETE	/project/:id	Soft delete (move to trash)
PATCH	/project/:id/restore	Restore trashed project
PATCH	/project/:id/restore-tasks	Restore all tasks of a project
GET	/tasks	List tasks (filter by project, status, trashed)
POST	/tasks	Create task
GET	/tasks/:id	Get single task
PATCH	/tasks/:id	Update task
DELETE	/tasks/:id	Soft delete task
PATCH	/tasks/:id/restore	Restore trashed task
GET	/dashboard	Get statistics (projects, tasks)
GET	/user/:id	Get user profile
PATCH	/user/:id	Update user (name, username)
DELETE	/user/:id	Delete user (cascade)
🧪 Running Tests
If you have added tests:

bash
# Backend tests
npm test --workspace=backend

# Frontend tests
npm test --workspace=frontend
📄 License
MIT

👤 Author
Your Name – GitHub

🙏 Acknowledgements
Tailwind CSS – styling

TanStack Query – data fetching

React Hot Toast – notifications

Express – backend framework

MongoDB – database

text
````
