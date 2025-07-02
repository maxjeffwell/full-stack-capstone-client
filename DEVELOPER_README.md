# Developer README

This document provides a technical overview of the `educationelly-client` codebase for development purposes.

## 1. Core Technologies

- **Framework**: React (v16)
- **State Management**: Redux, with `redux-thunk` for async actions and `redux-form` for form state.
- **Routing**: `react-router-dom`
- **API Communication**: `axios`
- **Styling**: A combination of `styled-components` for custom styling and `semantic-ui-react` for pre-built components.
- **Testing**: `enzyme` and `react-scripts` (Jest)

## 2. Project Structure

-   **`src/index.js`**: Application entry point. Initializes the Redux store, loads fonts, and renders the root `App` component. The Redux store is initialized with the `auth` state from `localStorage`.
-   **`src/components/App.js`**: Contains the main application component, including the `react-router-dom` setup. It also defines global styles using `styled-components`.
-   **`src/actions/`**: Contains Redux action creators.
    -   `index.js`: Defines all async actions, including API calls using `axios` for signup, signin, and fetching student data.
    -   `types.js`: Defines action type constants.
-   **`src/reducers/`**: Contains Redux reducers.
    -   `index.js`: Combines all reducers using `combineReducers`.
    -   `auth.js`: Manages authentication state (`authenticated`, `errorMessage`).
    -   `studentsReducer.js`: Manages the list of students.
-   **`src/config.js`**: Exports the `API_BASE_URL` for the backend server.
-   **`src/validators.js`**: Contains form validation logic.
-   **`public/`**: Contains the static assets and the main `index.html` file.

## 3. Key Scripts

-   **`npm start`**: Starts the development server.
-   **`npm test`**: Runs the test suite using Jest and Enzyme.
-   **`npm run build`**: Creates a production-ready build of the application.
-   **`npm run lint`**: Lints the files in the `src` directory using ESLint.

## 4. State Management (Redux)

-   The Redux store is created in `src/index.js`.
-   The initial state for authentication is loaded from `localStorage.getItem('jwtToken')`.
-   Async actions are handled by `redux-thunk`.
-   The state is structured with the following main reducers: `auth`, `students`, `form`, `modals`, `signup`, and `isSidebarToggled`.

## 5. API Communication

-   All API calls are made using `axios`.
-   The base URL for the API is configured in `src/config.js`.
-   For authenticated requests, the JWT token is retrieved from `localStorage` and sent in the `Authorization` header as a bearer token.
