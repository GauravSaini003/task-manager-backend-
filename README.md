# Project and Task Management API

An Express and MongoDB API for an internal project-management tool. Authenticated users can create projects, add tasks to their projects, and update task status.

## Tech stack

- Node.js and Express
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- express-validator for request validation

## Local setup

1. Install Node.js 18 or newer and MongoDB (or create a MongoDB Atlas database).
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env`, then provide your MongoDB URI and two different long JWT secrets.
4. Start the development server:

   ```bash
   npm run dev
   ```

The API runs on `http://localhost:5000` by default. Confirm it with `GET /api/health`.

## Environment variables

| Variable                 | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| `PORT`                   | HTTP port; defaults to `5000`            |
| `MONGO_URI`              | MongoDB connection string                |
| `JWT_ACCESS_SECRET`      | Secret used to sign access tokens        |
| `JWT_REFRESH_SECRET`     | Secret used to sign refresh tokens       |
| `JWT_ACCESS_EXPIRES_IN`  | Access-token lifetime; defaults to `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh-token lifetime; defaults to `7d` |
| `CLIENT_URL`             | Allowed frontend origin for CORS         |

## Scripts

| Command                | Purpose                        |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Run with automatic reload      |
| `npm start`            | Run the production server      |
| `npm test`             | Run the API health test        |
| `npm run lint`         | Check code with ESLint         |
| `npm run format:check` | Check formatting with Prettier |

## Folder structure

```text
src/
  config/       Environment and database configuration
  controllers/  Request handling and business logic
  middleware/   Authentication, validation, and error handling
  models/       Mongoose schemas
  routes/       API endpoint definitions
  app.js        Express application configuration
  server.js     Database connection and HTTP server startup
test/           Automated API tests
```

## API overview

Send `Authorization: Bearer <accessToken>` to all project and task endpoints.

| Method           | Endpoint                         | Purpose                                      |
| ---------------- | -------------------------------- | -------------------------------------------- |
| POST             | `/api/auth/register`             | Create an account                            |
| POST             | `/api/auth/login`                | Sign in and receive tokens                   |
| POST             | `/api/auth/refresh`              | Exchange a refresh token for an access token |
| POST             | `/api/auth/logout`               | Invalidate a refresh token                   |
| GET, POST        | `/api/projects`                  | List or create projects                      |
| GET, PUT, DELETE | `/api/projects/:id`              | Read, update, or delete a project            |
| GET, POST        | `/api/projects/:projectId/tasks` | List or create a project's tasks             |
| PUT, DELETE      | `/api/tasks/:id`                 | Update or delete a task                      |
| PATCH            | `/api/tasks/:id/status`          | Update only a task status                    |
| GET              | `/api/health`                    | Health check                                 |

## Deployment

Frontend deployment URL: add after deployment.

Backend deployment URL: add after deployment.

For Render, configure the environment variables listed above and use `npm start` as the start command. Configure the frontend deployment with the backend URL and set `CLIENT_URL` to the frontend's deployed URL.
## Assignment documents

- Frontend-[Functional requirements document](docs/FRD.md)

## AI usage declaration

AI assistance was used to help review structure, documentation, and code quality. All submitted code should be understood and explainable by the developer before submission.
