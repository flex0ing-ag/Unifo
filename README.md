# Unifo - Project Management Dashboard

**Unifo** is a modern and feature-rich project management dashboard built using the **MERN-like stack**: **Next.js**, **Express.js**, **PostgreSQL**, and **Prisma**. It helps teams plan, track, and manage projects.

---

## 🚀 Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Redux Toolkit & RTK Query
- Material UI (for Data Grids)

### Backend
- Node.js
- Express.js
- Prisma ORM

### Database
- PostgreSQL (hosted on Render)

### Deployment
- Frontend: Vercel
- Backend & DB: Render

---

## 💻 Live Demo
🔗 [Unifo Live Website](https://unifo.vercel.app/)

## 🛠️ Getting Started Locally

### ✅ Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [PgAdmin](https://www.pgadmin.org/download/)(Optional) 

---

### ⚙️ Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/flex0ing-ag/Unifo.git
cd Unifo
``` 

#### 2. Install dependencies in both client and server:
   ```bash
   cd client
   npm i
   cd ..
   cd server
   npm i
   ```

#### 3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npm run seed
   ```

#### 4. Configure environment variables:

- .env for server settings (PORT, DATABASE_URL)
- .env.local for client settings (NEXT_PUBLIC_API_BASE_URL)

#### 5. Run the project
- Terminal 1
```bash
cd server
npm run dev
```

- Terminal 2
```bash
cd client
npm run dev
```
**Visit**: http://localhost:3000


---
## 📜 License

MIT License © 2025 Anshika Gupta
