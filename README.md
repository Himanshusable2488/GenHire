# GENHIRE

GENHIRE is an AI-powered interview preparation and resume enhancement platform. It leverages Google GenAI to generate personalized interview reports, technical and behavioral questions, skill gap analysis, and tailored resumes for job seekers. The project consists of a Node.js/Express backend and a React frontend, designed for a seamless and modern user experience.

## Features

- **AI Interview Report Generation:**
  - Upload your resume and job description to receive a detailed interview report.
  - Includes technical and behavioral questions, skill gap analysis, and a day-wise preparation plan.
- **Resume Enhancement:**
  - Generate a tailored, ATS-friendly resume PDF for any job description.
- **User Authentication:**
  - Secure registration, login, and logout with JWT-based authentication.
- **Downloadable Reports & Resumes:**
  - Download interview reports and resumes as PDF files.
- **Modern UI:**
  - Clean, responsive React frontend with protected routes and context-based state management.

## Folder Structure

```
GENAI/
├── Backend/
│   ├── server.js
│   ├── package.json
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
├── Frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── features/
│       ├── styles/
│       └── ...
```

## Getting Started

### Prerequisites
- Node.js (v18 or above recommended)
- npm
- MongoDB instance (local or cloud)
- Google GenAI API key

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `Backend/` with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_GENAI_API_KEY=your_google_genai_api_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm run dev
   ```
4. The app will be available at `http://localhost:5173`

## API Overview

- **POST** `/api/auth/register` — Register a new user
- **POST** `/api/auth/login` — Login
- **GET** `/api/auth/logout` — Logout
- **POST** `/api/interview/` — Generate interview report (with resume upload)
- **GET** `/api/interview/report/:id` — Get interview report by ID
- **POST** `/api/interview/resume/pdf/:id` — Generate tailored resume PDF

## Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Google GenAI, Puppeteer
- **Frontend:** React, Vite, Axios, SCSS, React Router, Context API

## Environment Variables

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT signing
- `GOOGLE_GENAI_API_KEY` — Google GenAI API key

## License

This project is for educational and demonstration purposes.

---

**GENHIRE** — AI-powered interview and resume assistant.
