# Portfolio Platform

An enterprise-grade, full-stack portfolio platform designed for optimal performance, security, and an interactive user experience. This system utilizes a decoupled MVC architecture with a modern React front-end and a robust Python Django back-end.

## Architecture

The project is strictly separated into two independent codebases:

- **/frontend (Client-Side View):** A high-performance single-page application built with React, Vite, and Tailwind CSS. It leverages Framer Motion for smooth, hardware-accelerated animations and implements a glassmorphic, cyberpunk-inspired design system.
- **/backend (Server-Side Logic & APIs):** A Python Django server providing RESTful APIs via Django REST Framework (DRF). It manages the SQLite database (scalable to PostgreSQL), handles content delivery, and processes asynchronous email dispatches for user feedback.

## Features

- **Dynamic Content Management:** Add, update, or remove projects dynamically using the built-in Django Admin dashboard without modifying source code.
- **Interactive UI/UX:** Features a sleek dark theme with neon accents, custom scrollbars, and interactive timeline components for educational and professional history.
- **Secure Feedback Pipeline:** A fully functional contact form that captures user ratings and feedback, storing records in the database and securely dispatching SMTP emails to the administrator.
- **Responsive Design:** Completely optimized for mobile, tablet, and desktop viewports.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Framer Motion, Axios, Lucide React
- **Backend:** Python 3, Django 6, Django REST Framework, SQLite
- **Tooling:** Git, Node.js, npm

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/mfd-7/Portfolio.git
cd Portfolio
```

### 2. Backend Setup
Navigate to the backend directory, create a virtual environment, and start the server:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 3. Frontend Setup
In a new terminal window, navigate to the frontend directory, install dependencies, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## Deployment

- **Frontend:** The `frontend` directory is optimized for instant deployment on Vercel or Netlify.
- **Backend:** The `backend` directory is production-ready for platforms such as Render, Railway, or AWS. Ensure you configure your environment variables (`CORS_ALLOWED_ORIGINS`, `EMAIL_HOST`, `DB_URL`) appropriately.

