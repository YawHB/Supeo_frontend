# Supeo backend

Developing a time management system - A microservice for Supeos current software solution

The following tutorial will guide you through how to install and run the application for both the frontend and backend.

## Technologies

* Frontend: JavaScript & React
* Backend: Node.js and GraphQL
* Database: PostgreSQL

## Prerequisites

* Node.js
* npm
* Docker
* Docker Compose

## Installation

  ### Frontend

  1. Open your terminal and navigate to the frontend directory:

    cd frontend
  3. Install dependencies:

    npm install

  ### Backend

  1. Open your terminal and navigate to the backend directory:

    cd backend

  2. On first run:

    docker compose up --build

  3. On subsequent runs:

    docker compose up

## How to run the application

  ### Running the frontend

  In the frontend directory:
    npm run dev

  The application will be running at http://localhost:5173.

  ### Running the backend

  In the backend directory:

## First-time startup
    docker compose up --build
## Subsequent startups
    docker compose up
The API server will be available at http://localhost:4000.









# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
