# Nest-Next Authentication & Authorization Project

This project implements a full-stack authentication and authorization workflow using NestJS (backend) and Next.js (frontend). It is structured as a monorepo using Turborepo and managed with the pnpm package manager.

## Features

- **JWT Authentication:** Secure user sessions with JSON Web Tokens (JWT).

- **Authentication Management:**

  - Backend: Handled by NestJS.
  - Frontend: Consumes authentication APIs in Next.js.

- **Authentication Flows:**

  - Local strategy for login and registration.
  - Google OAuth for social login.
  - Session management.

- **Security Enhancements:**

  - Hashed passwords for secure storage.
  - Refresh tokens for session persistence.
  - Role-based access control (RBAC) for authorization.

- **Refresh Token Revocation:** Ability to revoke refresh tokens for enhanced security.
- **Global Authentication:** Configured in NestJS for consistent auth handling across the backend.

## Tech Stack

### Backend

- **Framework:** NestJS
- **Database:** Neon Postgres
- **ORM:** Prisma
- Environment Variables:

DATABASE_URL=your_db_url

- JWT_SECRET=your_jwt_secret
- JWT_EXPIRES_IN=your_jwt_expiry_time
- REFRESH_JWT_SECRET=your_refresh_jwt_secret
- REFRESH_JWT_EXPIRES_IN=your_refresh_jwt_expiry_time
- FRONTEND_URL=your-app-frontend-url

- GOOGLE_CLIENT_ID=your_google_client
- GOOGLE_CLIENT_SECRET=your_google_client_secret
- GOOGLE_CALLBACK_URL=your_google_callback_url

### Frontend

- **Framework:** Next.js
- **Packages:**

  - **Jose:** For handling JWT operations.
  - **Zod:** For schema validation.

- Environment Variables:

- BACKEND_URL=your-app-backend-url
- FRONTEND_URL=your-app-frontend-url
- SESSION_SECRET_KEY=your_session_secret_key

### Project Structure

This project uses a Turborepo monorepo setup to manage the backend (NestJS) and frontend (Next.js) codebases efficiently.

## Setup Instructions

1. \***\*Clone the Repository:**

```bash
git clone <repository-url>
cd <repository-name>
```

2. **Install Dependencies:** Ensure you have **pnpm** installed. Then, run:

```bash
pnpm install
```

3. **Configure Environment Variables:**

- Create a .env file in the backend directory with the variables listed above.
- Create a .env file in the frontend directory with the variables listed above.

4. **Set Up the Database:**

- Ensure your Neon Postgres database is running.
- Update the DATABASE_URL in the backend .env file.
- Run Prisma migrations:

```bash
pnpm prisma migrate dev
```

5. **Run the Project:**

Make sure you are in the root folder of the project monorepo.
Then run:

```bash
pnpm run dev
```

6. **Access the Application:**

- Backend: Available at the configured BACKEND_URL.
- Frontend: Available at the configured FRONTEND_URL.

### Authentication Workflow

- **Local Strategy:**

  - Users can register and log in using email and password.
  - Passwords are hashed before storage.

- **Google OAuth:**

  - Users can log in using their Google accounts.
  - Configure GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URL in the backend .env.

- **Session Management:**

  - JWTs are used for authentication.
  - Refresh tokens are issued to maintain user sessions.
  - Tokens can be revoked for security.

- **Role-Based Access Control:**
  - Different user roles have access to specific resources.
  - Configured globally in NestJS.

### Security Features

- **Hashed Passwords:** Ensures passwords are securely stored with argon2
- **JWT and Refresh Tokens:** Provides secure and persistent user sessions.
- **Token Revocation:** Allows invalidating refresh tokens to prevent unauthorized access.
- **Global Auth Guard:** Ensures consistent authentication checks across the backend.

### License

This project is licensed under the MIT License.
