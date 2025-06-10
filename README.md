# Supeo Frontend Repository

Developing a time management system — a microservice for Supeo’s current software solution.

This tutorial will guide you through how to install and run the application for both frontend and backend.

---

## Technologies

* **Frontend**: JavaScript & React
* **Backend**: Node.js & GraphQL
* **Database**: PostgreSQL

---

## Prerequisites

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

---

## How to Install and Run the Application

### 🔧 Frontend

1. Open your terminal and navigate to the frontend directory:

   ```bash
   cd Supeo_frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the frontend:

   ```bash
   npm run dev
   ```

The application will be running at [http://localhost:5173](http://localhost:5173)

---

### 🐳 Backend

1. Open your terminal and navigate to the backend directory:

   ```bash
   cd Supeo_backend
   ```
2. On first run (builds the containers):

   ```bash
   docker compose up --build
   ```
3. On subsequent runs:

   ```bash
   docker compose up
   ```

The server will be available at [http://localhost:4000](http://localhost:4000)

---

## Notes

* Make sure to set up a `.env` file in the backend directory with appropriate environment variables for database access and secrets.
* Ports can be changed in config files or environment variables if needed.

---








# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
