# Student Management System (MERN)

A full-stack CRUD app: React (Vite + Tailwind) frontend, Node/Express/Mongoose backend.

## Project Structure
```
student-management-system/
├── backend/     # Express API + MongoDB (see backend/README.md)
└── frontend/    # React SPA (Vite + Tailwind + React Router)
```

## Quick Start

**1. Backend**
```bash
cd backend
npm install
cp .env.example .env
npm run dev        # http://localhost:5000
```

**2. Frontend** (in a second terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev         # http://localhost:5173
```

Make sure MongoDB is running locally (or update `MONGO_URI` in `backend/.env` to point at Atlas).

## Flow
`/login` (UI-only) → `/dashboard` (student counts by course) → `/students` (search, add, edit, delete)
→ `/students/add` / `/students/edit/:id` (validated form) → any unmatched route → `/404` page.

## Notes
- Search on the Student List page filters instantly on the client — no network delay, no page reload.
- The backend also supports `GET /students?search=term` server-side if you want to swap to server-driven search as the dataset grows.
- Duplicate emails are rejected both by the frontend's error display and by a unique index + explicit check in the backend.
- This project was generated in a sandboxed environment without network access, so `npm install` could not be run here to produce a lockfile or verify the build end-to-end — please run `npm install` yourself in each folder as the first step. Backend files were syntax-checked with `node -c`; frontend files were checked for import/export consistency.
  

>>>>>>> 059a373ce470e757a4af5160d6a0337760955d4d
