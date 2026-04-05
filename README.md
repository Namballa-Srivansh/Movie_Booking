<div align="center">
  <h1>🎬 Movie Booking System - Backend API</h1>
  <p>A robust, scalable RESTful API built with Node.js, Express, and MongoDB for seamless movie ticket booking.</p>

  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey.svg)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://mongoosejs.com/)
  [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
</div>

---

## 📖 Overview

This is the backend service for the Movie Booking System. It handles all the core business logic, including user authentication, movie and theater management, seat reservations, and payment processing. The API is built to be secure, fast, and scalable, communicating with a Next.js frontend and integrated with notification services.

## ✨ Key Features

- **🔐 Authentication & Authorization:** Secure user registration and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **🎥 Movie & Show Management:** Browse movies, search by genre/title, and view available shows.
- **🏢 Theatre Setup:** Manage theatres, screens, and seat layouts.
- **🎟️ Booking System:** Concurrency-safe seat reservation and booking lifecycle management.
- **💳 Payment Integration:** Dedicated payment routes built to handle transaction processing.
- **🔎 Dynamic Search:** Advanced search routes for finding movies and theatres quickly.

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Database:** MongoDB & Mongoose ORM
- **Authentication:** JWT (`jsonwebtoken`), Bcrypt (`bcrypt`)
- **Middleware:** `cors`, `body-parser`, `dotenv`
- **Architecture:** Controller-Service-Route Pattern
- **HTTP Client:** Axios (for integrations)

## 📁 Project Structure

```text
Backend/
├── controllers/    # Request handlers & response logic
├── middlewares/    # Custom middlewares (Auth, Error handling, etc.)
├── models/         # Mongoose schemas (User, Movie, Booking, etc.)
├── routes/         # Express API route definitions
├── scripts/        # Database seeding & utility scripts
├── services/       # Core business logic
├── utils/          # Helper functions
├── index.js        # Main application entry point
└── package.json    # Dependencies & project metadata
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas Atlas cluster)

### Installation

1. **Clone the repository and jump into the backend directory:**
   ```bash
   cd Backend
   ```

2. **Install all required dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the `Backend` root directory with the following variables:
   ```env
   # Application Port
   PORT=5000

   # Database connection string
   PROD_DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/movie-booking

   # JWT Secret Key
   JWT_SECRET=your_super_secret_jwt_key
   
   # Frontend URL (For CORS allowed origins)
   FRONTEND_URL=http://localhost:3000
   ```

4. **Run the server:**
   ```bash
   # Start the development server
   node index.js
   ```
   The backend will usually be accessible at `http://localhost:5000` (or whichever port you've specified).

## 🚏 Core API Endpoints

The API prefixes might vary, but generally handle the following entities:

- `GET /` — Health check endpoint. Returns `Hello World!`.
- `/api/auth` — User registration, login, and token generation.
- `/api/users` — User profile management and history.
- `/api/movies` — CRUD operations for movies.
- `/api/theatres` — Manage cinemas and seating layouts.
- `/api/shows` — Time slots and show availability.
- `/api/bookings` — Creating and viewing ticket bookings.
- `/api/payments` — Payment processing hooks.
- `/api/search` — Unified search functionalities.

*(Note: Endpoint prefixes are defined within `routes/` directory files.)*

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a Pull Request.

## 📝 License

This project is licensed under the **ISC** License.
