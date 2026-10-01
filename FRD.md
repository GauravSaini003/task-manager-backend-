# Functional Requirements Document

## Project-management internal tool

### Purpose

Provide authenticated users with a small internal tool to organise projects and the tasks within them. Each user can access only the projects and tasks they own.

### Feature list

- User registration and login using email and password.
- JWT-based access to protected APIs.
- Create, view, edit, and delete projects.
- Create, view, edit, and delete tasks inside a project.
- Update a task's status to `todo`, `in-progress`, or `done`.
- Display project and task information in a separate React or Next.js frontend.

### User flow

1. A new user registers with a name, email address, and password.
2. The user logs in and receives an access token and refresh token.
3. The frontend stores the session securely and sends the access token with protected requests.
4. The user creates a project from the project list.
5. The user opens a project, views its tasks, and creates or edits tasks.
6. The user changes a task's status; the task list updates to show the new status.
7. The user may delete a task or a project. Deleting a project also deletes its tasks.

### Validations

- Name, email, and password are required at registration; password length is at least six characters.
- Email must be valid and unique.
- Project names are required and may not exceed 100 characters.
- Task titles are required and may not exceed 150 characters.
- Task status must be one of `todo`, `in-progress`, or `done`.
- Protected actions require a valid JWT access token.
- A user cannot read, edit, or delete another user's projects or tasks.
- Invalid object IDs, missing routes, and validation failures return a clear error response.

### Assumptions

- Every project has one owner; projects are not shared between users.
- Every task belongs to exactly one project and its project owner owns the task.
- A task has one of three statuses only; priority, due date, and assignees are outside this version's scope.
- Refresh tokens are stored in the database so logout can invalidate the current session.
- The frontend is deployed separately and its URL is provided through `CLIENT_URL`.

### Non-functional requirements

- Passwords are stored only as bcrypt hashes.
- JWT secrets and database connection details are provided through environment variables and never committed.
- The API returns JSON responses and has a health endpoint for deployment checks.
- The backend must be deployed publicly (for example, Render) and connect to MongoDB through an environment variable.
