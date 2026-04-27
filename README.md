# Mind-Mitr

A secure authentication backend for students, counselors, and admins, built with Node.js, Express, and MongoDB.

## Features

- User registration and login with role support (student, counselor, admin)
- JWT-based authentication
- Protected API routes
- MongoDB integration
- Automated tests

## Folder Structure

```
server/         # Backend code (Node.js, Express, MongoDB)
  config/       # Database config
  models/       # Mongoose models (User, etc.)
  routes/       # API route handlers
  tests/        # Automated tests (Jest)
client/         # Frontend code (React or other)
mobile/         # Mobile app code (if any)
```

## Quick Start for Developers

1. Clone the repo and install dependencies:
  ```
  git clone https://github.com/Piyushkant-Coder/sih25.git
  cd sih25
  npm install
  ```
2. Set up your `.env` file (see below).
3. Start MongoDB locally (or use MongoDB Atlas).
4. Run the backend:
  ```
  npm start
  ```
5. Run tests:
  ```
  npm test
  ```

## Environment Variables (.env)

```
MONGO_URI=mongodb://localhost:27017/mindmitr
JWT_SECRET=your_jwt_secret
PORT=5000
```

## CORS (Frontend-Backend Communication)
The backend uses the `cors` package. If you have CORS issues, update the CORS settings in `server.js`.

## API Error Handling
- All endpoints return clear error messages for invalid input, missing fields, or unauthorized access.
- Example error response:
  ```json
  { "msg": "No token, authorization denied" }
  ```

## Contribution Workflow
1. Pull the latest changes:
  ```
  git pull origin main
  ```
2. Create a new branch for your feature or fix:
  ```
  git checkout -b feature/my-feature
  ```
3. Make your changes and commit:
  ```
  git add .
  git commit -m "Describe your change"
  ```
4. Push your branch and open a pull request:
  ```
  git push origin feature/my-feature
  ```

## Useful Commands
- Start backend: `npm start`
- Run tests: `npm test`
- View MongoDB data: use MongoDB Compass, mongosh, or VS Code MongoDB extension

## Contact
For questions, ask [Piyushkant-Coder](https://github.com/Piyushkant-Coder) or open an issue.

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or cloud)
- (Optional) MongoDB Compass or mongosh for database viewing

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Piyushkant-Coder/sih25.git
   cd sih25
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your `.env` file:
   ```
   MONGO_URI=mongodb://localhost:27017/mindmitr
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Running Tests

```
npm test
```

## API Endpoints

### Register

- **POST** `/api/auth/register`
- Body:
  ```json
  {
    "name": "Demo User",
    "email": "demo@example.com",
    "password": "password123",
    "role": "student"
  }
  ```

### Login

- **POST** `/api/auth/login`
- Body:
  ```json
  {
    "email": "demo@example.com",
    "password": "password123"
  }
  ```
- Returns: `{ "token": "...", "role": "student" }`

### Protected Route

- **GET** `/api/auth/protected`
- Header: `Authorization: Bearer <token>`
- Returns user info if token is valid.

## Project Structure

```
server/
  config/
  models/
  routes/
  tests/
client/
mobile/
```

## Contributing

Pull requests are welcome!

## License

MIT
