# Quiz Builder - :crystal_ball:Amazing app to build quizzes:ok_woman:

Create and manage quizzes with ease using this modern full-stack application

## [Live Link](https://jsgo.pro/quizbuilder/) :link:

<br/>

## Folder structure :open_file_folder:

The project follows a full-stack structure:

- `backend/` – Express + PostgreSQL
- `frontend/` – React.js
- `backend/postgres/` – Docker setup for the database
- `backend/docker-compose.yml` – Orchestrates services

<div align="center">
  <img src="https://jsgo.pro/media/structure/quiz_builder_project_structure.png" alt="Quiz Builder Folder structure" width="100%" />
  <br>
</div>

## How To Use :closed_lock_with_key:

### 1️⃣ Sign Up, Install & Run Docker Desktop

Download, install and run Docker Desktop:  
🔗 [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 2️⃣ Clone the Repository

Open a terminal or command prompt and run:

```sh
git clone git@github.com:mux-mux/quiz-builder.git
cd quiz-builder
```

### 3️⃣ Setup Postgres Database

Inside the `backend` folder, create a file named `.env` with the following content:

```sh
# App Config
PORT=3001
BASE_URL=http://localhost:3001
NODE_ENV=development

# Database Config
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_DB=quiz-builder-docker
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# Connection URL
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

### 4️⃣ Start Backend

This will set start PostgreSQL and the Express server:

```sh
cd backend
npm install
npm run docker
```

### 5️⃣ Start Frontend

This will Open the browser & listen to files changes<br/>
Open another terminal in the project root and run:

```sh
cd frontend
npm install
npm run dev
```

Your app should now be running!<br/>
On: 🔗 http://localhost:3000

### 🎯 Notes

Ensure Docker Desktop is running before executing npm run docker.<br/>
If you encounter any issues, try running:

```sh
docker-compose down && npm run docker
```
