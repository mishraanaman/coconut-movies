# Mongo Mflix 🎬

Mongo Mflix is a platform to discove your favourite movies, shows and theaters. It is an attempt to showcase MongoDB's Full Text and Geo Search capabilities using **MongoDB Atlas**, **React** and **Express**

---

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/namanmish/coconut-movies.git
cd coconut-movies
```

### 2. Configure MongoDB Atlas

Add your MongoDB Atlas connection string as MONGO_URI = <connection_string> in `backend/.env`

### 3. Setup Backend
```bash
cd backend
npm install
npm start
```
The backend server will run at:  
```bash
http://localhost:3000
```

### 4. Setup Frontend
In a new terminal window:
```bash
cd frontend
npm install
npm start
```
The frontend will run at:  
```bash
http://localhost:1234
```

---

## Project Structure

- `frontend/` — React application for the user interface.
- `backend/` — Express server and API endpoints.

---

## Technologies Used

- **MongoDB Atlas** — Multi Cloud database.
- **React** — For building a responsive UI.
- **Express.js** — Backend API.
- **Redux Toolkit** — Application state management.
- **Tailwind CSS** — Styling (if used).
- **Other libraries** — Axios, React Router, etc.

---

## Features

- Browse movies and shows.
- Search movies with real-time results.
- Display IMDb ratings and search scores.
- Smooth UI with light ray effects and carousel display.