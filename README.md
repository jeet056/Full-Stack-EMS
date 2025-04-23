# Full-Stack-EMS
Full stack employee management app using react and spring-boot.

## Running with Docker

This project provides Docker support for both the backend (Spring Boot) and frontend (React) applications. The recommended way to run the full stack is with Docker Compose.

### Requirements
- Docker
- Docker Compose

### Service Details
- **Backend (java-ems)**
  - Built from `./ems` using Eclipse Temurin JDK 21
  - Exposes port **8080** (Spring Boot default)
- **Frontend (js-ems-frontend)**
  - Built from `./ems-frontend` using Node.js **22.13.1**
  - Exposes port **3000** (React app default)

### Build and Run
1. Make sure Docker and Docker Compose are installed.
2. From the project root, run:
   ```sh
   docker compose up --build
   ```
   This will build and start both the backend and frontend services.

### Configuration
- No environment variables are required by default. If you need to set any, you can use a `.env` file and uncomment the `env_file` lines in the `docker-compose.yml`.
- Both services run as non-root users for improved security.

### Access
- Backend API: [http://localhost:8080](http://localhost:8080)
- Frontend UI: [http://localhost:3000](http://localhost:3000)

---
