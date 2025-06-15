# Express API Example

A simple RESTful API for user management built with Express.js and MongoDB. Features user registration, login with JWT authentication, and CRUD operations for users. Includes request logging and authentication middleware.

## File Structure
```
express-api-example/
├── cmd.txt
├── index.js
├── package.json
├── readme.md
├── logs/
│   ├── logger.js
│   └── logs/
│       └── api-logs.json
├── middlewares/
│   └── authMiddleware.js
├── models/
│   └── User.js
├── routes/
│   ├── auth.js
│   └── user.js
├── Postman/
│   └── 🔐User Management API.postman_collection.json
```

## Features
- User registration and login (JWT-based authentication)
- Protected routes for user management
- Request logging to JSON file
- MongoDB integration via Mongoose

## Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token
- `GET /api/users` — List all users (protected)
- `GET /api/users/:id` — Get user by ID (protected)
- `PUT /api/users/:id` — Update user by ID (protected)
- `DELETE /api/users/:id` — Delete user by ID (protected)
- `GET /api/secret` — Example protected route

## Getting Started
1. Clone the repo and install dependencies:
   ```sh
   npm install
   ```
2. Update MongoDB connection string in `index.js` if needed.
3. Start the server:
   ```sh
   node index.js
   ```
4. API runs at [http://localhost:3000](http://localhost:3000)

## Dependencies
- express
- mongoose
- jsonwebtoken
- bcryptjs
- uuid

## Logging
All API requests are logged to `logs/api-logs.json`.

---
**Note:** For demo purposes, the JWT secret is hardcoded. For production, use environment variables.
