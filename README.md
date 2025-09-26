# Quiz Builder - :crystal_ball:Amazing app to build quizes:ok_woman:in the image:mountain_bicyclist:

## [Live Link](https://jsgo.pro/quiz_builder/) :link:

<br/>

## Folder structure :open_file_folder:

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

### 3️⃣ Start Backend

This will set up PostgreSQL and the Express server:

```sh
cd backend
npm install
docker-compose up --build
```

### 4️⃣ Start Frontend

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

Ensure Docker Desktop is running before executing docker-compose up.<br/>
If you encounter any issues, try running:

```sh
docker-compose down && docker-compose up --build
```
