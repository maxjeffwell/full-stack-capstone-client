# educationELLy

![React](https://img.shields.io/badge/React-16.14.0-blue.svg?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/Redux-4.0.5-purple.svg?style=flat-square&logo=redux)
![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat-square)

**educationELLy** is a web application that bridges the gap between ELL (English Language Learning) teachers and mainstream classroom teachers. It provides a centralized platform for managing ELL student information, tracking English language proficiency, and facilitating integrated curriculum development.

## 🌟 Key Features

- **Student Management**: Create, read, update, and delete ELL student profiles
- **Secure Authentication**: JWT-based authentication system
- **Responsive Design**: Fully responsive interface for desktop and mobile devices
- **Real-time Updates**: Redux state management for seamless data flow
- **Teacher Collaboration**: Shared platform for ELL and mainstream teachers

## 🔐 Authentication

educationELLy uses a JWT (JSON Web Token) based authentication system for secure user access:

### How It Works

1. **User Registration/Login**: Users sign up or sign in through the authentication forms
2. **Token Generation**: The backend generates a JWT token upon successful authentication
3. **Token Storage**: The JWT token is stored in the browser's `localStorage` for persistence
4. **Authenticated Requests**: The token is automatically included in all API requests via Axios interceptors
5. **Protected Routes**: React Router uses Higher-Order Components (HOCs) to protect authenticated routes
6. **Token Validation**: The backend validates the token for each protected API endpoint
7. **Automatic Logout**: Users are logged out when the token expires or is invalid

### Implementation Details

- **Token Storage**: `localStorage.getItem('token')` - Persists across browser sessions
- **Redux Integration**: Token state managed in Redux store (`src/reducers/auth.js`)
- **API Configuration**: Axios interceptors in `src/config.js` automatically attach the token to request headers
- **Route Protection**: `authRequired` HOC wraps protected components (`src/components/authRequired.js`)
- **Token Lifecycle**:
  - Set on successful login/signup (`src/actions/index.js`)
  - Removed on logout
  - Checked on app initialization (`src/index.js`)

### Security Features

- Passwords hashed with bcrypt before storage
- Token expiration for enhanced security
- Secure token transmission over HTTPS in production
- No sensitive data stored in the JWT payload

## 🚀 Live Demo

**Demo URL**: [https://educationelly-client-71a1b1901aaa.herokuapp.com/](https://educationelly-client-71a1b1901aaa.herokuapp.com/)

**Demo Credentials**:

```
Username: demo
Password: demopassword
```

## 📸 Screenshots

<details>
<summary>View Application Screenshots</summary>

### Desktop Views

- [Landing Page](https://gyazo.com/e98b1d2276640f2cb0a54adee95896c2)
- [Login Page](https://gyazo.com/2d67665682bed2ed50fad959e1b6f26f)
- [Registration Page](https://gyazo.com/ed654f3e775d938c17018d9bb540ffa1)
- [Instructor Dashboard](https://gyazo.com/9edd9b0e825a85b5b4c6f30a1e277f70)
- [Student List](https://gyazo.com/3bedb6168f8df87c6777ef2285418882)
- [Update Student](https://gyazo.com/489ca40991dbdb5227b7a4814448d1a9)
- [Create Student](https://gyazo.com/504eb28443de1f891f0a3d267649b4c7)
- [Delete Confirmation](https://gyazo.com/6559db4cf59b06e47d00c81b04192ec2)

### Mobile Views

- [Mobile Landing](https://gyazo.com/9d94bf0e1eda5b7f2aa34806d781101e)
- [Mobile Login](https://gyazo.com/752835350a1245d984441da9bc1b18bf)
- [Mobile Registration](https://gyazo.com/7f1a30a7ac45cd2838a6a863df2f707f)
- [Mobile Student Card](https://gyazo.com/f424c97ceed872696aed619f4b8af006)
- [Mobile Update Student](https://gyazo.com/53e57d7b52365af84cbeab01ec67e934)

</details>

## 🛠️ Technology Stack

### Frontend

- **React** (16.14.0) - Component-based UI library
- **Redux** (4.0.5) - State management
- **Redux Thunk** - Async action handling
- **Redux Form** (8.3.7) - Form state management
- **React Router DOM** (5.2.0) - Client-side routing
- **Semantic UI React** (0.88.2) - UI component library
- **Styled Components** (4.4.1) - CSS-in-JS styling
- **Axios** (0.21.1) - HTTP client

### Backend

- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt.js** - Password hashing

### Testing

- **Jest** - JavaScript testing framework
- **Enzyme** - React component testing
- **React Testing Library** - Testing utilities

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── App.js          # Root component
│   ├── Dashboard.js    # Main dashboard
│   └── ...            # Other components
├── actions/            # Redux action creators
├── reducers/           # Redux reducers
├── tests/             # Component tests
├── config.js          # API configuration
├── validators.js      # Form validation
└── index.js           # App entry point
```

## 💻 Installation

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- MongoDB (for backend)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/maxjeffwell/educationELLy.git
cd educationELLy
```

2. Install dependencies:

```bash
npm install
```

3. Set environment variables:

```bash
# Create a .env file in the root directory
REACT_APP_API_BASE_URL=http://localhost:8080
```

4. Start the development server:

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run lint` - Run ESLint

## 🔗 Related Resources

- [Backend Repository](https://github.com/maxjeffwell/full-stack-capstone-server)
- [API Documentation](https://documenter.getpostman.com/view/4941848/S1Lu29ZF)

## 🚧 Next Steps

### Short-term Enhancements

- [ ] **Add Student Search and Filtering** - Implement search by name, grade level, and proficiency
- [ ] **Bulk Operations** - Allow teachers to update multiple students at once
- [ ] **Export Functionality** - Export student data to CSV/PDF formats
- [ ] **Email Notifications** - Send updates when student profiles are modified
- [ ] **Dark Mode** - Add theme switching capability

### Long-term Features

- [ ] **Progress Tracking Dashboard** - Visual charts showing student progress over time
- [ ] **Document Upload** - Attach assessment reports and documents to student profiles
- [ ] **Collaborative Notes** - Shared note-taking between ELL and mainstream teachers
- [ ] **Parent Portal** - Allow parents to view their child's progress
- [ ] **Multi-language Support** - Translate interface for non-English speaking users
- [ ] **Integration with School Systems** - Connect with existing SIS platforms
- [ ] **Mobile App** - Native iOS/Android applications

### Technical Improvements

- [ ] **Migrate to TypeScript** - Add type safety to the codebase
- [ ] **Upgrade to React 18** - Utilize latest React features
- [ ] **Implement React Query** - Better server state management
- [ ] **Add E2E Testing** - Cypress or Playwright for integration tests
- [ ] **Performance Optimization** - Code splitting and lazy loading
- [ ] **Accessibility Audit** - Ensure WCAG 2.1 AA compliance
- [ ] **Docker Support** - Containerize the application
- [ ] **CI/CD Pipeline** - Automated testing and deployment

### Infrastructure

- [ ] **Move from Heroku** - Migrate to modern hosting (Vercel, Netlify, or AWS)
- [ ] **CDN Integration** - Improve asset delivery speed
- [ ] **Error Tracking** - Implement Sentry or similar service
- [ ] **Analytics** - Add user behavior tracking
- [ ] **API Rate Limiting** - Prevent abuse and ensure fair usage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Jeff Maxwell**

- Email: [jeff@el-jefe.me](mailto:jeff@el-jefe.me)
- GitHub: [@maxjeffwell](https://github.com/maxjeffwell)
- Portfolio: [https://www.el-jefe.me](https://www.el-jefe.me)

---

> **educationELLy** - Making every teacher a language teacher 🌍📚
