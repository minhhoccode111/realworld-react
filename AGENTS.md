# Project Overview

This repository contains two distinct projects that together form a full-stack RealWorld application: a React frontend and a Go Fiber backend.

---

## 1. `react-realworld` (Frontend)

### Project Overview

This is a frontend web application that implements the RealWorld specification using React, Vite, and TypeScript. It provides a user interface for all core RealWorld functionalities, including user authentication, article management (listing, creation, editing), commenting, and user profiles.

### Key Technologies

*   **Framework:** React
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** Zustand
*   **Data Fetching:** React Query
*   **Form Management:** React Hook Form
*   **UI Components:** Radix UI
*   **Testing:** Vitest (unit), Playwright (e2e), Storybook (component)
*   **Routing:** React Router

### Building and Running

**Prerequisites:**
*   Node.js (v20+)
*   Yarn (v1.22+)

**Setup:**

1.  Navigate to the `react-realworld` directory:
    ```bash
    cd /home/mhc/projects/react-realworld
    ```
2.  Install dependencies:
    ```bash
    yarn install
    ```
3.  Copy environment variables:
    ```bash
    cp .env.example .env
    ```

**Commands:**

*   **Development Mode:** Runs the app in development mode, typically accessible at `http://localhost:3000`.
    ```bash
    yarn dev
    ```
*   **Build for Production:** Creates a production-ready build in the `dist` folder.
    ```bash
    yarn build
    ```
*   **Run Unit Tests:** Executes unit tests using Vitest.
    ```bash
    yarn test
    ```
*   **Run End-to-End Tests:** Executes end-to-end tests using Playwright.
    ```bash
    yarn test-e2e
    ```
*   **Run Storybook:** Starts the Storybook development server for UI components.
    ```bash
    yarn storybook
    ```
*   **Linting:** Runs ESLint to check for code quality issues.
    ```bash
    yarn lint
    ```
*   **Type Checking:** Performs TypeScript type checking.
    ```bash
    yarn check-types
    ```
*   **Code Generation:** Uses Plop for generating new components or modules.
    ```bash
    yarn generate
    ```

### Development Conventions

*   **Linting & Formatting:** Enforced with ESLint and Prettier.
*   **Pre-commit Hooks:** Managed by Husky to ensure code quality before commits.
*   **Testing Strategy:** Includes unit tests (Vitest), end-to-end tests (Playwright), and component stories (Storybook).

---

## 2. `fiber-clean-realworld` (Backend)

### Project Overview

This is a backend API application that implements the RealWorld specification using the Go programming language and the Fiber web framework. It adheres to a Clean Architecture pattern, providing a robust and scalable API for the frontend. It includes features like user authentication, article management, comments, profiles, and tags.

### Key Technologies

*   **Language:** Go
*   **Web Framework:** Fiber
*   **Database:** PostgreSQL (via `jackc/pgx/v5` and `squirrel` for query building)
*   **Messaging:** RabbitMQ, NATS
*   **Containerization:** Docker, Docker Compose
*   **API Documentation:** Swagger
*   **Validation:** `go-playground/validator`
*   **Logging:** `rs/zerolog`

### Building and Running

**Prerequisites:**
*   Go (v1.25+)
*   Docker and Docker Compose

**Setup:**

1.  Navigate to the `fiber-clean-realworld` directory:
    ```bash
    cd /home/mhc/projects/fiber-clean-realworld
    ```
2.  Start the required services (PostgreSQL, RabbitMQ, NATS) using Docker Compose:
    ```bash
    make compose-up
    ```
    (To bring down the services: `make compose-down`)

**Commands:**

*   **Run with Swagger:** Builds and runs the application with Swagger API documentation enabled.
    ```bash
    make run-swag
    ```
*   **Run Application:** Builds and runs the application without Swagger.
    ```bash
    make run
    ```
*   **Build Application:** Compiles the Go application into an executable.
    ```bash
    make build
    ```
*   **Run Unit Tests:** Executes unit tests for the Go modules.
    ```bash
    make test
    ```
*   **Run Integration Tests:** Executes integration tests against the running services.
    ```bash
    make compose-up-integration-test # This will run the integration tests and then shut down the stack
    ```
*   **Database Migrations:**
    *   Create a new migration file: `make migrate-create name="your_migration_name"`
    *   Apply pending migrations: `make migrate-up`
    *   Rollback the last migration: `make migrate-down`
    *   Show migration status: `make migrate-status`
*   **Generate Mocks:** Generates mock interfaces for testing.
    ```bash
    make mock
    ```
*   **Generate Swagger Docs:** Generates Swagger documentation.
    ```bash
    make swag-v1
    ```
*   **Generate Protobuf Files:** Generates Go source files from `.proto` definitions.
    ```bash
    make proto-v1
    ```
*   **Format Code:** Formats Go code using `gofumpt` and `gci`.
    ```bash
    make format
    ```
*   **Check Dependencies:** Verifies module dependencies and checks for vulnerabilities.
    ```bash
    make deps
    make deps-audit
    ```
*   **Linter:** Runs `golangci-lint` for static analysis.
    ```bash
    make linter-golangci
    ```
*   **Help:** Displays all available `make` commands.
    ```bash
    make help
    ```

### Development Conventions

*   **Clean Architecture:** Project structure follows a Clean Architecture pattern.
*   **Code Formatting:** Enforced with `gofumpt` and `gci`.
*   **Linting:** Uses `golangci-lint` for comprehensive static analysis.
*   **Testing:** Includes unit and integration tests, with mock generation for dependencies.
*   **API Documentation:** Swagger is used for API documentation and exploration.
*   **Database Migrations:** Managed with `golang-migrate/migrate`.
