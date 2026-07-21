# Task Manager — Full Stack MERN App

A full-stack task management application built with the MERN stack 
(MongoDB, Express, React, Node.js) featuring JWT authentication, 
protected routes, and ownership-based access control.

## 🔗 Live Demo
- **Frontend:** https://task-manager-sana-fatima.vercel.app/login
- **Backend API:** https://task-manager-1-dy49.onrender.com

## 📁 Project Structure
task-manager/
├── task-client/     → React frontend
└── task-api/        → Node.js + Express backend

## ⚙️ Tech Stack
| Frontend | Backend | Database |
|----------|---------|----------|
| React.js | Node.js | MongoDB Atlas |
| Axios | Express.js | Mongoose |
| Context API | JWT Auth | |
| React Router | bcrypt | |

## ✨ Features
- User registration and login with JWT authentication
- Password hashing with bcrypt
- Protected routes — only authenticated users can access tasks
- Full CRUD — create, read, update, delete tasks
- Ownership validation — users can only delete their own tasks
- Deployed frontend + backend with live database

## 🚀 Quick Start

### Backend
```bash
cd task-api
npm install
# add .env file with MONGO_URI, JWT_SECRET, PORT
npm run dev
```

### Frontend
```bash
cd task-client
npm install
npm start
```

## 📬 Contact
**Sana Fatima** — sanaf8865@gmail.com  
[LinkedIn](https://www.linkedin.com/in/sana-fatima-6635a1145) · 
[Portfolio](https://sanafatima8865.github.io/sana-portfolio/) · 
[GitHub](https://github.com/SanaFatima8865)
