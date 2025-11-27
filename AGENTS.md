# Project Overview

This is a RealWorld React application, built with Vite, React, TypeScript, React Query, React Router, Shadcn UI, and TailwindCSS. It aims to demonstrate a "bulletproof" React architecture. The application features a typical blog-like structure with user authentication, article management (create, read, update, delete), commenting, and user profiles (follow/unfollow, favorited articles).

The application's data model includes:
*   **User:** Can have roles like `ADMIN` (create/edit/delete discussions, manage comments, delete users, edit own profile) and `USER` (edit own profile, manage own comments).
*   **Team:** Represents a group with one admin and multiple users participating in discussions.
*   **Discussion:** Created by team members.
*   **Comment:** Messages within a discussion.

**Key Technologies:**

*   **Framework:** React
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **State Management/Data Fetching:** React Query (with React Query Auth for authentication), Zustand (client-side state)
*   **Routing:** React Router
*   **UI Components:** Shadcn UI (headless component library built on Radix UI)
*   **Styling:** TailwindCSS
*   **Testing:** Vitest (unit/integration), Playwright (e2e)
*   **Storybook:** For UI component development and documentation
*   **Linting/Formatting:** ESLint, Prettier

## Building and Running

### Prerequisites

*   Node.js (version 20+)
*   Yarn (version 1.22+)

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/minhhoccode111/realworld-react.git
    cd realworld-react
    ```

    _Note: The `README.md` suggests `cd apps/react-vite`, but the current directory structure indicates the project root is `realworld-react`._

2.  **Copy environment variables:**

    ```bash
    cp .env.example .env
    ```

3.  **Install dependencies:**
    ```bash
    yarn install
    ```

### Available Scripts

*   **`yarn dev`**: Runs the app in development mode.
    *   Access at: [http://localhost:5173](http://localhost:5173) (Vite's default port, or check console output)
*   **`yarn build`**: Builds the app for production to the `dist` folder.
*   **`yarn preview`**: Serves the production build locally for preview.
*   **`yarn test`**: Runs unit and integration tests using Vitest.
*   **`yarn test-e2e`**: Runs end-to-end tests using Playwright. This also starts a mock server.
*   **`yarn lint`**: Lints the source code using ESLint.
*   **`yarn check-types`**: Performs TypeScript type checking.
*   **`yarn generate`**: Runs `plop` for code generation (e.g., components).
*   **`yarn storybook`**: Starts the Storybook development server.
*   **`yarn build-storybook`**: Builds the Storybook static assets.
*   **`yarn run-mock-server`**: Runs the mock server (used by e2e tests).

## Development Conventions

### Project Structure

The codebase largely resides in the `src` folder, following a feature-sliced architecture for scalability and maintainability.
*   **`src/app`**: Application layer, including routes, main app component, providers, and router configuration.
*   **`src/assets`**: Static files like images and fonts.
*   **`src/components`**: Shared components used across the application.
*   **`src/config`**: Global configurations and environment variables.
*   **`src/features`**: Feature-based modules, each self-contained with its own API, assets, components, hooks, stores, types, and utilities. This is the primary location for most code.
*   **`src/hooks`**: Shared custom React hooks.
*   **`src/lib`**: Reusable libraries preconfigured for the application (e.g., API client, React Query setup).
*   **`src/stores`**: Global state stores.
*   **`src/testing`**: Test utilities and mocks.
*   **`src/types`**: Shared TypeScript types.
*   **`src/utils`**: Shared utility functions.

**Architectural Principles:**
*   **Feature-Sliced Design:** Encourages organizing code by feature, keeping related logic colocated and preventing mixing of feature-specific code with shared components.
*   **Unidirectional Codebase:** Enforces a flow of dependencies from shared parts to features, and from features to the application layer (shared -> features -> app). This is enforced via ESLint rules to prevent anti-patterns like cross-feature imports or feature importing from app.
*   **Absolute Imports:** Configured using `@/*` to simplify import paths and improve code readability and refactoring.

### Code Quality & Standards

*   **ESLint:** Used for maintaining code quality and adhering to coding standards, configured via `.eslintrc.cjs` to identify and prevent common errors.
*   **Prettier:** Ensures consistent code formatting, integrated with "format on save" in IDEs and potentially with ESLint.
*   **TypeScript:** Provides static type checking, crucial for identifying issues during refactoring and enhancing overall code safety, especially in complex projects.
*   **Husky:** Implements Git hooks to run code validations (linting, formatting, type checking) before commits, ensuring high code standards are maintained.
*   **File Naming Conventions:** Enforced for consistency (e.g., `kebab-case` for files and folders within `src`) using ESLint rules.

### Components & Styling

*   **Component Best Practices:**
    *   **Colocation:** Keep components, functions, styles, and state as close as possible to their usage.
    *   **Modularity:** Extract pieces of UI that are logical units into separate, smaller components instead of large, nested rendering functions.
    *   **Consistency:** Maintain a consistent code style, particularly for component naming (e.g., PascalCase), often enforced by linters and formatters.
    *   **Limited Props:** Reduce the number of props a component accepts by splitting it or using composition (`children`, `slots`).
    *   **Abstraction:** Abstract shared components into a component library (e.g., `src/components/ui`), and wrap third-party components to adapt them to application needs and facilitate future changes.
*   **Component Libraries:** Uses Shadcn UI, a headless component library built on Radix UI, providing unstyled components for greater design flexibility.
*   **Styling Solutions:** Primarily uses TailwindCSS for utility-first styling. Notes on zero-runtime styling solutions for React Server Components are also relevant.
*   **Storybook:** Utilized for developing, testing, and documenting UI components in isolation, serving as a comprehensive component catalog.

### API Layer

*   **Single API Client:** Encourages using a single, pre-configured instance of the API client (e.g., Axios in `src/lib/api-client.ts`) for all API interactions.
*   **Structured Request Declarations:** API requests are defined and exported separately, including types/validation schemas, fetcher functions, and React Query hooks. This approach enhances organization, type safety, and simplifies tracking of available endpoints.

### State Management

Effective state management is achieved by categorizing state based on usage:

*   **Component State:** Local to individual components, managed with `useState` for simple states and `useReducer` for complex ones.
*   **Application State:** Global state for features like modals, notifications, or themes, managed using solutions like React Context + hooks, Redux, MobX, Zustand, Jotai, or XState. Zustand is used in this project (e.g., `src/components/ui/notifications/notifications-store.ts`).
*   **Server Cache State:** Data fetched from the server and cached locally, primarily managed by libraries like React Query (used in this project), SWR, Apollo Client, URQL, or RTK Query.
*   **Form State:** Handled by libraries such as React Hook Form (used in this project), Formik, or React Final Form, often integrated with validation libraries like Zod (used in this project) or Yup.
*   **URL State:** Data stored in the browser's address bar (URL/query parameters), managed via routing solutions like React Router.

### Testing

The testing strategy emphasizes integration and end-to-end tests for comprehensive coverage and confidence in application functionality.

*   **Types of Tests:**
    *   **Unit Tests:** Smallest tests for isolated components and functions (e.g., `src/components/ui/dialog/confirmation-dialog/__tests__/confirmation-dialog.test.tsx`).
    *   **Integration Tests:** Checks how different parts of the application work together, providing significant confidence in the application's reliability (e.g., `src/app/routes/app/discussions/__tests__/discussion.test.tsx`).
    *   **End-to-End (E2E) Tests:** Automates the entire application flow, simulating user interaction to confirm system-wide correctness (e.g., `e2e/tests/smoke.spec.ts`).
*   **Recommended Tooling:**
    *   **Vitest:** Modern and flexible testing framework, similar to Jest, for unit and integration tests.
    *   **Testing Library:** Focuses on testing applications from a user's perspective, avoiding implementation details.
    *   **Playwright:** Tool for running automated E2E tests in browser or headless mode, suitable for CI/CD.
    *   **MSW (Mock Service Worker):** Used for prototyping APIs and for robust testing by intercepting HTTP requests and returning desired responses, eliminating the need to mock `fetch` directly.

### Performance

Various strategies are employed to optimize application performance:

*   **Code Splitting:** Implemented at the route level to split JavaScript into smaller files, enabling lazy loading and optimizing initial application load times.
*   **Component and State Optimizations:**
    *   Avoid monolithic state; split global state.
    *   Colocate state as close as possible to its usage.
    *   Use state initializer functions for expensive computations (`React.useState(() => myExpensiveFn())`).
    *   Consider atomic state management libraries (e.g., Jotai) for high-velocity data.
    *   Use React Context judiciously for low-velocity data; consider `use-context-selector` or proper component composition for medium/high-velocity data.
    *   Prefer build-time styling solutions (TailwindCSS, vanilla-extract, CSS modules) over runtime solutions (Emotion, Styled Components) for performance.
*   **Children as Optimization:** Leveraging the `children` prop to prevent unnecessary re-renders of child components when parent state updates.
*   **Image Optimizations:** Lazy loading images, using modern formats (WEBP), and `srcset` for responsive image delivery.
*   **Web Vitals:** Monitoring Core Web Vitals scores using tools like Lighthouse and Pagespeed Insights.
*   **Data Prefetching:** Utilizing `queryClient.prefetchQuery` from React Query to prefetch data for upcoming pages, improving perceived loading times.

### Error Handling

A robust error handling strategy is implemented across the application:

*   **API Errors:** Interceptors are used to manage API errors (e.g., in `src/lib/api-client.ts`), enabling notification toasts, logging out unauthorized users, or token refreshing.
*   **In-App Errors:** React error boundaries are utilized to gracefully handle errors within specific UI segments, preventing a single error from crashing the entire application. Multiple error boundaries are preferred for better containment.
*   **Error Tracking:** External tools like Sentry are recommended for tracking production errors, providing detailed insights into issues (platform, browser, source maps).

### Security

Comprehensive security measures are integrated:

*   **Authentication:**
    *   Uses JSON Web Tokens (JWT) for user authentication in SPAs.
    *   Tokens are stored securely in cookies (with `HttpOnly` attribute assumed for the real API) rather than `localStorage` to mitigate XSS risks. `js-cookie` is used for cookie management.
    *   **XSS Protection:** Crucially, all user inputs are sanitized before display (e.g., via `DOMPurify` as seen in `src/components/ui/md-preview/md-preview.tsx`) to prevent XSS attacks.
    *   **User Data:** User information is treated as global state, managed by `react-query-auth` (in `src/lib/auth.tsx`) or other state management solutions.
*   **Authorization:**
    *   **RBAC (Role-Based Access Control):** Access to resources determined by predefined roles (e.g., `USER`, `ADMIN`) and their associated permissions.
    *   **PBAC (Permission-Based Access Control):** Provides more granular control, allowing fine-tuned permissions based on specific criteria, such as resource ownership (e.g., only a comment's author can delete it). This can be enforced via components and policies.

## Deployment

Applications are deployed and served over a CDN for optimal delivery and performance. Recommended platforms include:

*   Vercel
*   Netlify
*   AWS CloudFront
*   CloudFlare

## Further Exploration

*   **`src/main.tsx`**: Application entry point.
*   **`src/app/index.tsx`**: Main application component.
*   **`src/app/router.tsx`**: Defines application routes.
*   **`src/features/`**: Contains feature-sliced modules (e.g., `articles`, `auth`, `comments`, `profiles`, `tags`).
*   **`src/components/ui/`**: Houses Shadcn UI components.
*   **`src/lib/`**: Utility functions and configurations (e.g., `api-client.ts`, `react-query.ts`).
*   **`config/`**: Global configuration files.

## Additional Resources

### React

*   [Official Documentation](https://react.dev/)
*   [Tao Of React](https://alexkondov.com/tao-of-react/)
*   [React Handbook](https://reacthandbook.dev/)
*   [React Philosophies](https://github.com/mithi/react-philosophies)
*   [React Patterns](https://reactpatterns.com/)
*   [React Typescript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### JavaScript

*   [You Dont Know JS](https://github.com/getify/You-Dont-Know-JS)
*   [JavaScript Info](https://javascript.info/)
*   [33 Concepts Every JavaScript Developer Should Know](https://github.com/leonardomso/33-js-concepts#8-iife-modules-and-namespaces)
*   [JavaScript to Know for React](https://kentcdodds.com/blog/javascript-to-know-for-react)

### Best Practices

*   [patterns.dev](https://www.patterns.dev/)
*   [Naming Cheatsheet](https://github.com/kettanaito/naming-cheatsheet)
*   [Clean Code Javascript](https://github.com/ryanmcdermott/clean-code-javascript)

