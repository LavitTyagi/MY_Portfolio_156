# Lavit Tyagi Portfolio

A personal portfolio website built with a static frontend and a Node.js backend. The site presents Lavit's profile, skills, projects, certificates, and resume content while allowing admin-only updates through a secure dashboard.

## Overview

This project is split into two parts:

- Frontend: static portfolio page served from GitHub Pages or any static host
- Backend: Express API for managing profile content, admin authentication, and file uploads

The public site reads portfolio data from MongoDB, while uploaded images and PDFs are stored in Cloudinary.

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Authentication: JWT + bcrypt
- File Storage: Cloudinary
- Security: Helmet, CORS, rate limiting

## Features

- Responsive portfolio layout
- Public-facing profile and resume information
- Admin login with secure backend validation
- Edit profile sections dynamically
- Upload profile photo and PDF files
- MongoDB-powered content management
- Clean separation between frontend and API

## Project Structure

```text
lavit-portfolio/
├── index.html              # Main portfolio page
├── style.css               # Site styling and responsive layout
├── script.js               # Frontend logic and API calls
├── README.md               # Project documentation
├── backend/
│   ├── server.js           # Express API and MongoDB integration
│   ├── package.json        # Backend dependencies and scripts
│   └── ...                 # Additional backend setup files
└── .vscode/                # Editor settings
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 20 or newer
- A MongoDB Atlas cluster
- A Cloudinary account
- A hosting platform for the backend (for example, Render)
- A static host for the frontend (for example, GitHub Pages)

## Local Development

1. Clone the repository.
2. Open the backend folder:

```bash
cd backend
npm install
```

3. Start the backend locally:

```bash
npm run dev
```

4. Open the frontend in a browser. If needed, update the API base URL in `script.js` to point to your local backend.

The backend exposes APIs such as:

- `GET /api/health` for health checks
- login and profile management routes
- upload endpoints for media files

## Deployment

### Frontend

Deploy the static files to GitHub Pages or another static host. Set `API_BASE` in `script.js` to the deployed backend URL (for example, `https://your-api.example.com/api`); the current value targets the production Render API.

### Backend

Deploy the `backend` folder to a Node.js hosting service. Configure the required production credentials. The server always allows this repository's GitHub Pages origin (`https://lavittyagi.github.io`) and the listed local development origins. `CLIENT_ORIGINS` may be set to a comma-separated list of additional exact origins, without paths or trailing slashes. The hosting service should provide `PORT`; the server defaults to port `5000` for local development.

## Admin Usage

- Navigate to the admin login section from the website
- Sign in with the configured admin credentials
- Update portfolio content, upload media, and save changes
- Published data is stored in MongoDB and served dynamically from the API

## Notes

- The frontend and backend are designed to work separately, so the portfolio can be hosted statically while the API runs on a backend service.
- Keep sensitive credentials and service secrets on the backend server only.
- Replace the demo content in the portfolio with your personal information before final publishing.

## License

This project is for personal portfolio use and is not currently published under a public license.
