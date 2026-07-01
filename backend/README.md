# Student Management System — Backend

## Setup
```bash
cd backend
npm install
cp .env.example .env   # then edit MONGO_URI if needed
npm run dev             # requires nodemon (installed as devDependency)
# or
npm start
```

Server runs at `http://localhost:5000` by default.

## API Endpoints
| Method | Endpoint          | Description                          |
|--------|-------------------|---------------------------------------|
| GET    | /students         | List all students (supports ?search=) |
| GET    | /students/:id     | Get a single student                  |
| POST   | /students         | Create a student                      |
| PUT    | /students/:id     | Update a student                      |
| DELETE | /students/:id     | Delete a student                      |

All responses follow the shape: `{ success, data | message, error? }`.
