# Scalable REST API – Full Stack Project

A full-stack scalable RESTful application built using:

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Role-Based Access Control (RBAC)
- React.js (Frontend)
- Postman API Documentation

---

## 📁 Project Structure

scalable-rest-api/
│
├── backend/ → Node.js + Express API
├── frontend/ → React Frontend UI
├── README.md
└── .gitignore

## 🚀 Features

### Backend
- JWT Authentication
- Role-based access control (Admin/User)
- CRUD operations for Tasks
- Protected routes
- API versioning (`/api/v1`)
- Rate limiting
- Centralized error handling
- Logging
- MongoDB indexing
- Modular scalable architecture

### Frontend
- Dark themed UI
- Login & Register forms
- JWT-based protected dashboard
- Role badge display (Admin/User)
- Admin panel (view all tasks)
- Task CRUD operations
- API error/success message handling

### API Documentation
- Postman Collection included:
  backend/postman_collection.json

---

## ⚙️ Backend Setup

### 1️⃣ Navigate to backend

cd backend

### 2️⃣ Install dependencies

npm install


### 3️⃣ Create `.env` file

Create a `.env` file inside backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


### 4️⃣ Run backend

npm run dev

Server runs at:

http://localhost:5000


---

## 💻 Frontend Setup

### 1️⃣ Navigate to frontend

cd frontend

### 2️⃣ Install dependencies

npm install

### 3️⃣ Run frontend

npm start

Frontend runs at:

http://localhost:3000


---

## 🔐 Role-Based Access

- Default role: `user`
- Admin users can:
  - Access `/tasks/admin/all`
  - View all tasks
- Role is stored inside JWT token
- Backend enforces permission checks

---

## 📦 API Endpoints

### Authentication
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Tasks
- `POST /api/v1/tasks`
- `GET /api/v1/tasks`
- `PUT /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`
- `GET /api/v1/tasks/admin/all` (Admin only)

---

## 📈 Scalability Approach

This application is designed with scalability in mind:

- Modular folder structure (controllers, routes, middleware, models)
- Stateless JWT authentication (supports horizontal scaling)
- Role-based access control
- API versioning for backward compatibility
- MongoDB indexing for optimized queries
- Rate limiting to prevent abuse
- Centralized error handling
- Separation of frontend and backend
- Easily extendable architecture

### Future Improvements

- Microservices architecture
- Redis caching
- Load balancing
- Docker containerization
- CI/CD integration
- Cloud deployment

---

## 📝 Submission Notes

- Backend hosted on GitHub
- Working APIs for authentication & CRUD
- Basic frontend UI connected to APIs
- Postman API documentation included
- Scalability explanation provided

---

