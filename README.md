# CampusFlow

CampusFlow is a modern, full-stack student management dashboard designed with a minimalist SaaS aesthetic. It features an Express REST API, SQLite database persistence, and an editorial React frontend containerized with Docker and Nginx.

---

## Features

- **Student Management**: Full lifecycle management of student profiles and academic departments.
- **REST API**: Clean Express backend with structured JSON endpoints and standard HTTP status codes.
- **Full CRUD**: Create, read, update, and delete students with immediate, optimistic UI updates.
- **Instant Client-Side Search**: Multi-field search across student names, emails, and departments with instant keystroke filtering.
- **Field-Level Validation**: Client-side validation ensuring valid name, department, and RFC-compliant email formats.
- **Persistent SQLite Database**: File-based database backed by Docker volumes for zero-loss data persistence across restarts.
- **Containerized Architecture**: Multi-stage Docker builds orchestrating Nginx and Node via Docker Compose.
- **Responsive React UI**: Editorial dashboard layout that adapts seamlessly across mobile, tablet, and desktop screens.
- **Light / Dark Mode**: Integrated theme toggle with smooth color transitions and persistent user preferences.
- **Resilient UI States**: Pulsing loading skeletons, distinct empty states, inline error messages, and duplicate submission guards.

---

## Architecture

```text
React Frontend (Vite)
       │
       ▼
Nginx (Production) / Vite Proxy (Development)
       │
       ▼
Express REST API (Port 5000)
       │
       ▼
SQLite Database (campusflow.db)
```

---

## Tech Stack

### Frontend
- **React 19** — Component-driven UI architecture
- **Vite** — High-performance frontend build tooling
- **JavaScript (ES Modules)** — Clean, standard asynchronous logic
- **Tailwind CSS** — Modern typography and curated warm neutral color system
- **Lucide React** — Consistent icon library

### Backend
- **Node.js (LTS)** — Server-side JavaScript runtime
- **Express** — RESTful API routing and JSON middleware
- **SQLite3** — Embedded SQL database engine

### DevOps & Infrastructure
- **Docker** — Multi-stage reproducible containerization
- **Docker Compose** — Multi-container service orchestration
- **Nginx** — High-performance reverse proxy and static asset server

---

## API Endpoints

| Method | Endpoint | Purpose | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/students` | Retrieve all student records | None |
| `GET` | `/api/students/:id` | Retrieve a single student by ID | None |
| `POST` | `/api/students` | Create a new student | `{ "name", "email", "department" }` |
| `PATCH` | `/api/students/:id` | Update an existing student | `{ "name"?, "email"?, "department"? }` |
| `DELETE` | `/api/students/:id` | Remove a student record | None |
| `GET` | `/api/health` | Healthcheck and server status | None |

---

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Start Backend Server
```bash
cd backend
npm install
npm run dev
```
The Express API runs at `http://localhost:5000`.

### 2. Start Frontend Application
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
The React development server runs at `http://localhost:5173`. Requests to `/api` are automatically proxied to port 5000.

---

## Docker Deployment

### 1. Build Containers
```bash
docker compose build
```

### 2. Start Services
```bash
docker compose up -d
```
- **Frontend Application**: [http://localhost](http://localhost) (Port 80)
- **Backend API**: [http://localhost:5000](http://localhost:5000) (Port 5000)

### 3. Check Container Status & Logs
```bash
docker compose ps
docker compose logs -f
```

### 4. Stop Services
```bash
docker compose down
```
*(Your student records in `sqlite_data` persist across restarts).*

---

## Project Structure

```text
campusflow/
├── backend/
│   ├── src/
│   │   ├── database/
│   │   │   ├── database.js      # SQLite connection & schema initializer
│   │   │   └── schema.sql       # SQL table definitions
│   │   ├── routes/
│   │   │   ├── health.routes.js # API healthcheck route
│   │   │   └── student.routes.js# CRUD endpoint handlers
│   │   └── server.js            # Express server entry point
│   ├── Dockerfile               # Production Node.js Alpine container
│   ├── .dockerignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Sidebar, Header, ThemeToggle
│   │   │   └── students/        # StudentCard, StudentList, StudentForm
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    # Overview metrics & stats
│   │   │   └── Students.jsx     # Student directory, search & CRUD flows
│   │   ├── services/
│   │   │   └── studentApi.js    # Native fetch API service
│   │   ├── App.jsx              # Shell layout & theme provider
│   │   └── index.css            # Base typography & design tokens
│   ├── nginx.conf               # Production Nginx reverse proxy configuration
│   ├── Dockerfile               # Multi-stage build (Vite -> Nginx)
│   ├── .dockerignore
│   └── package.json
│
├── docker-compose.yml           # Orchestration for frontend & backend services
├── .gitignore                   # Ignores dependencies, environment & database files
└── README.md                    # Project documentation
```

---

## Learning & Engineering Highlights

- **RESTful API Design**: Clean separation of concerns with dedicated route handlers, parameter validation, and appropriate HTTP status codes (`200`, `201`, `400`, `404`, `500`).
- **React State & Effects**: Robust asynchronous workflows using `useState` and `useEffect` with proper loading guards and mounted cleanup.
- **Optimistic UI Updates**: Reactive state manipulation modifying the UI immediately upon successful API calls without full-page reloads.
- **Embedded Database Persistence**: Managing file-based SQLite connections, schema initialization, and mapping Docker named volumes for zero data loss.
- **Resilient UI/UX States**: Handling edge cases including network disconnections, pulsing skeleton placeholders, field validation errors, and multi-criteria empty states.
- **Containerization & Reverse Proxying**: Multi-stage Docker builds minimizing production image footprint and eliminating CORS issues through Nginx proxy routing.
