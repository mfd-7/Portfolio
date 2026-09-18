# Md. Muhtasim Fuad — Portfolio Platform

**Live Production URL:** [https://muhtasim-fuad.vercel.app](https://muhtasim-fuad.vercel.app)

A high-performance personal portfolio and engineering showcase designed with an interactive cyberpunk aesthetic, glassmorphic UI components, and fluid hardware-accelerated animations. The application is architected to highlight software engineering projects, system security experience, academic credentials, and client collaboration channels.

---

## Overview

The platform serves as the central digital presence for **Md. Muhtasim Fuad** (Full-Stack Developer & Security Specialist). It is built with a clean separation of concerns, ensuring ultra-fast load times, responsive layouts across all viewports, and seamless client communication through an integrated direct transmission pipeline.

---

## Key Highlights

- **Visual Interface & Experience:** Custom dark theme featuring neon cyan accents (`#00F3FF`), glassmorphism cards, interactive particle grids, and fluid scroll-triggered transitions.
- **Project Showcase:** Highlights flagship systems including enterprise engineering platforms and cybersecurity threat tracking tools.
- **Academic & Skill Milestones:** Structured interactive timeline showcasing educational background (BRAC University, Cantonment College, BAF Shaheen College) alongside technical competency matrices.
- **Direct Communication Channel:** Functional feedback and collaboration portal featuring rating controls, direct email dispatching, and contact pipelines.
- **Connected Footprint:** Verified links to professional profiles across GitHub, LinkedIn, and social media platforms.

---

## Architecture & Codebase Structure

The repository follows a decoupled architecture:

```text
PORTFOLIO/
├── frontend/             # High-performance client application
│   ├── src/
│   │   ├── App.jsx       # Core single-page application & component orchestration
│   │   ├── index.css     # Design tokens, Tailwind CSS directives & custom glassmorphism rules
│   │   └── main.jsx      # React entry point
│   ├── public/           # Static assets, media & profile resources
│   ├── package.json      # Dependencies and execution scripts
│   └── vite.config.js    # Vite compilation & plugin configuration
│
├── backend/              # Optional Python/Django REST API service
│   ├── api/              # Models, serializers, and administrative routing
│   ├── core/             # Project settings and WSGI configuration
│   └── requirements.txt  # Python environment dependencies
│
└── README.md             # Project documentation
```

---

## Technology Stack

### Frontend Core
- **Framework & Runtime:** React 19, Vite
- **Styling Architecture:** Tailwind CSS v4, Custom CSS Variables
- **Animation Engine:** Framer Motion
- **Iconography:** Lucide React, React Icons

### Backend & Infrastructure
- **Runtime:** Python 3.12, Django, Django REST Framework
- **Hosting & CDN:** Vercel Global Edge Network

---

## Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation & Execution

1. Clone the repository:
   ```bash
   git clone https://github.com/mfd-7/Portfolio.git
   cd Portfolio
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install project dependencies:
   ```bash
   npm install
   ```

4. Launch the local development server:
   ```bash
   npm run dev
   ```

5. Access the application in your browser at `http://localhost:5173`.

---

## Production Deployment

The frontend is configured for deployment on the Vercel edge network:

- **Production Domain:** [https://muhtasim-fuad.vercel.app](https://muhtasim-fuad.vercel.app)
- **Deployment Strategy:** Continuous deployment directly linked with the repository's `main` branch.

---

## Contact & Connect

- **Portfolio:** [muhtasim-fuad.vercel.app](https://muhtasim-fuad.vercel.app)
- **GitHub:** [github.com/mfd-7](https://github.com/mfd-7)
- **LinkedIn:** [linkedin.com/in/muhtasim-fuad-093a8b274](https://www.linkedin.com/in/muhtasim-fuad-093a8b274/)
- **Email:** muhtasimfuad3570@gmail.com
