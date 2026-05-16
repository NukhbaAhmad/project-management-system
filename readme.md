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

```text
project-management-system/
├── backend/                      # Express API
│   ├── src/
│   │   ├── controllers/          # Route handlers
│   │   ├── services/             # Routes executions
│   │   ├── config/               # Different Services configuration
│   │   ├── models/               # Mongoose schemas & models
│   │   ├── routes/               # API endpoint definitions
│   │   ├── middlewares/          # Auth, Joi validation, error handlers, error convertor
│   │   └── validations/          # Joi validation schemas
│   ├── .env                      # Backend environment variables
│   └── package.json
├── frontend/                     # React application (Vite)
│   ├── src/
│   │   ├── api/                  # Axios configuration and services
│   │   ├── components/           # Reusable UI components
│   │   ├── constants /           # Constant Data
│   │   ├── layout/               # App layout components
│   │   ├── hooks/                # Custom TanStack Query hooks
│   │   ├── pages/                # App views (Dashboard, Projects, Tasks, Profile)
│   │   ├── types/                # Shared TypeScript definitions
│   │   └── utils/                # Helper functions, route guards, event bus
│   ├── .env                      # Frontend environment variables
│   └── package.json
├── package.json                  # Root npm workspaces configuration
└── README.md                     # Documentation
text
```

## 🚀 How to Run the Project

### Prerequisites

- Node.js **18+** (npm 9+ recommended)
- MongoDB instance (local or Atlas)

### 1. Clone the repository
To get this looking exactly right in your `README.md`, you need to copy the **raw Markdown code** so that the code blocks, bold text, and headers don't lose their formatting.

Here is exactly how to do it:

### Step 1: Copy the Raw Code

Hover over the block below and click the **"Copy"** button in the top-right corner.

```markdown
## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/project-management-system.git](https://github.com/your-username/project-management-system.git)
cd project-management-system

```

### 2. Install Dependencies

This project uses npm workspaces to manage both the frontend and backend. Run the following command in the root directory to install dependencies for both applications automatically:

```bash
npm install

```

### 3. Set Up Environment Variables

Create a `.env` file in both the backend and frontend directories using the provided templates:

* **Backend:** `backend/.env`
* **Frontend:** `frontend/.env`

### 4. Run the Application

#### Development Mode (Concurrent)

To spin up both the frontend and backend concurrently with hot-reloading:

```bash
npm run dev

```

* **Frontend:** http://localhost:5173 *(Default Vite port)*
* **Backend:** http://localhost:3000 *or* http://localhost:3001

#### Running Services Separately

If you prefer to run the services individually, use the following commands from the root directory:

```bash
# Run only the backend
npm run dev:backend

# Run only the frontend
npm run dev:frontend

```

---

### 5. Production Build

To build both applications for production deployment, run:

```bash
npm run build

```

Once the build completes, you can start the production-ready applications using:

```bash
# Start the built backend application
npm run start:backend

# Start the built frontend application
npm run start:frontend

```

```

### Step 2: Paste it into your project
1. Open your project in VS Code (or your preferred editor).
2. Open your `README.md` file.
3. Delete the old, messy layout section.
4. **Paste** (Ctrl+V or Cmd+V) this copied block directly into the file.
5. Save the file. 

If you are using VS Code, you can press **Ctrl + Shift + V** (or **Cmd + Shift + V** on Mac) to open a live preview and see how clean it looks.

```