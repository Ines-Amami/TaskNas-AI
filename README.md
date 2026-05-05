<div align="center">

# ⚡ TaskNas AI

**AI-Powered Project Management — MERN Stack**

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 📌 About

**TaskNas AI** is a full-stack project management app where you type a goal and **Google Gemini AI** automatically breaks it into organized tasks on a Kanban board. Built with the MERN stack and Tailwind CSS.

---

## 🖼️ Preview

<img width="1920" height="881" alt="TaskNas AI" src="https://github.com/user-attachments/assets/3e585e0d-eb5f-4f5b-a236-3170d73a2464" />

---

## ✨ Key Features

- 🤖 **AI Goal Breakdown** — Type a goal, Gemini creates tasks with priorities, tags and subtasks
- 💬 **AI Chat Assistant** — Chat with Gemini about your project directly in the app
- 📊 **AI Workload Insights** — Gemini analyzes your tasks and gives productivity tips
- ✍️ **AI Task Descriptions** — Auto-generate task descriptions from just a title
- 📋 **Kanban Board** — Organize tasks across To Do, In Progress, Review and Completed
- 🔐 **Authentication** — Secure login with JWT and bcryptjs password hashing

---

## 🛠️ Built With

| Frontend | Backend | AI |
|---|---|---|
| React + Vite | Node.js + Express | Google Gemini |
| Tailwind CSS | MongoDB + Mongoose | Gemini 2.0 Flash |
| Redux Toolkit | JWT + bcryptjs | Via backend only |
| React Router | REST API | Key stays safe in `.env` |

---

## 🚀 Getting Started

```bash
# Clone the project
git clone https://github.com/Ines-Amami/TaskNas-AI.git
cd TaskNas-AI

# Install all dependencies
npm install
cd backend && npm install
cd ../frontend && npm install && cd ..
```

Create `backend/.env`:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_key
PORT=5000
```

```bash
# Run the app
npm run dev
```

Open **http://localhost:5173**

---

## 👩‍💻 Author

**Ines Amami**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ines-Amami)
