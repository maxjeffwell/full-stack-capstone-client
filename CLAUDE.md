# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**educationELLy** is a full-stack React/Redux application designed to help mainstream classroom teachers engage with English Language Learning (ELL) students. The application provides a centralized platform for teachers to access and manage ELL student information, track English language proficiency, and facilitate integrated curriculum development.

## Commands

### Development
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests with Jest in jsdom environment
- `npm run lint` - Run ESLint on src directory

### Testing
- Tests use Jest, Enzyme, and React Testing Library
- Component tests located in `src/tests/` directory
- Run individual test: `npm test -- --testNamePattern="test name"`

## Architecture

### State Management (Redux)
The application uses Redux with Redux Thunk for async actions:

**Store Configuration** (`src/index.js`):
- Redux store with Redux DevTools extension
- Initial state includes JWT token from localStorage
- Redux Thunk middleware for async actions

**Reducers** (`src/reducers/`):
- `auth.js` - Authentication state (authenticated, errorMessage)
- `studentsReducer.js` - Student data management
- `signupReducer.js` - Registration form state
- `toggleReducer.js` - UI toggle states (sidebar)
- `modalReducer.js` - Modal display state
- `redux-form` - Form state management

**Actions** (`src/actions/`):
- `index.js` - Main action creators for auth, students CRUD, API calls
- `modalActions.js` - Modal display actions
- `types.js` - Action type constants

### Authentication
- JWT-based authentication with localStorage persistence
- Protected routes using HOCs
- Automatic token inclusion in API requests via axios interceptors
- Sign up, sign in, and sign out functionality

### Routing
React Router DOM with the following routes:
- `/` - Landing page
- `/signup` - User registration
- `/signin` - User login
- `/signout` - User logout
- `/dashboard` - Main dashboard (protected)
- `/students` - Student list (protected)
- `/students/new` - Create student form (protected)
- `/students/:id/update` - Update student form (protected)

### API Integration
- Base URL configuration in `src/config.js`
- Axios for HTTP requests with bearer token authentication
- RESTful API endpoints for students CRUD operations
- Environment variable support for API base URL

## Component Structure

### Main Components
- **App.js** - Root component with routing and global styles
- **Dashboard.js** - Main dashboard for authenticated users
- **Landing.js** - Public landing page

### Authentication Components (`src/components/auth/`)
- **Register.js** - User registration form
- **Signin.js** - User login form
- **Signout.js** - Logout functionality
- **Students.js** - Student list display
- **authRequired.js** - Higher-order component for route protection

### Student Management
- **CreateStudent.js** - Add new student form
- **UpdateStudent.js** - Edit student form
- **DeleteStudent.js** - Delete confirmation

### UI Components
- **Header.js** - Application header with navigation
- **Footer.js** - Application footer
- **Navigation.js** - Main navigation menu
- **Sidebar.js** - Collapsible sidebar navigation
- **ModalManager.js** - Modal dialog management
- **LazyImage.js** - Optimized image loading component

## Key Technologies

- **React 16.14.0** - Component-based UI library
- **Redux 4.0.5** - State management with Redux Thunk for async actions
- **Redux Form 8.3.7** - Form state management and validation
- **React Router DOM 5.2.0** - Client-side routing
- **Semantic UI React 0.88.2** - UI component library
- **Styled Components 4.4.1** - CSS-in-JS styling
- **Axios 0.21.1** - HTTP client for API requests
- **React Modal 3.12.1** - Modal dialog components

## Development Notes

### Authentication Flow
1. User signs up/signs in via forms
2. JWT token stored in localStorage
3. Token included in API requests via axios config
4. Protected routes check authentication status
5. Automatic logout on token expiration

### Form Management
- Redux Form for complex form state management
- Form validation with custom validators (`src/validators.js`)
- Semantic UI React form components
- Error handling and display

### Testing Strategy
- Component unit tests with Enzyme
- Authentication flow testing
- Form submission testing
- API integration testing
- Setup in `src/setupTests.js`

### Styling Approach
- Styled Components for component-specific styles
- Semantic UI CSS for base styling
- Global styles in App.js
- Responsive design considerations
- Custom theme colors defined in index.js

## API Integration

The application connects to a separate Express.js backend API:
- Authentication endpoints: `/signup`, `/signin`
- Student CRUD endpoints: `/students`
- JWT token-based authentication
- API documentation available in project README

## Deployment

- Configured for Heroku deployment
- Environment variables for API base URL
- Static.json for SPA routing support
- Demo account available (username: demo, password: demopassword)

## Project Structure
```
src/
├── components/
│   ├── App.js                 # Root component with routing
│   ├── Dashboard.js           # Main dashboard
│   ├── Landing.js             # Public landing page
│   ├── CreateStudent.js       # Add student form
│   ├── UpdateStudent.js       # Edit student form
│   ├── DeleteStudent.js       # Delete confirmation
│   ├── Header.js              # App header
│   ├── Footer.js              # App footer
│   ├── Navigation.js          # Main navigation
│   ├── Sidebar.js             # Collapsible sidebar
│   ├── ModalManager.js        # Modal management
│   ├── LazyImage.js           # Optimized images
│   ├── authRequired.js        # Route protection HOC
│   └── auth/
│       ├── Register.js        # Registration form
│       ├── Signin.js          # Login form
│       ├── Signout.js         # Logout component
│       └── Students.js        # Student list
├── actions/
│   ├── index.js               # Main action creators
│   ├── modalActions.js        # Modal actions
│   └── types.js               # Action constants
├── reducers/
│   ├── index.js               # Root reducer
│   ├── auth.js                # Authentication state
│   ├── studentsReducer.js     # Student data
│   ├── signupReducer.js       # Registration state
│   ├── toggleReducer.js       # UI toggles
│   └── modalReducer.js        # Modal state
├── tests/                     # Component tests
├── config.js                  # API configuration
├── history.js                 # Router history
├── validators.js              # Form validation
└── index.js                   # App entry point
```