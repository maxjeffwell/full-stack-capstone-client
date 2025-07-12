# Development Guide

This guide covers the development setup, tools, and workflows for the educationELLy project.

## Prerequisites

- Node.js 18.x or 20.x
- npm 9.x or higher
- Git

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## Development Tools

### Code Quality

- **ESLint**: Linting and code quality enforcement
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run tools on staged files only

### Available Scripts

```bash
# Development
npm start                 # Start development server
npm test                  # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
npm run test:ci          # Run tests for CI (no watch)

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues automatically
npm run format           # Format code with Prettier
npm run format:check     # Check if code is formatted
npm run validate         # Run all checks (lint + format + test)

# Git Workflow
npm run commit           # Use conventional commits with Commitizen

# Build
npm run build           # Create production build
```

## Pre-commit Hooks

The project uses Husky to run checks before commits:

1. **lint-staged**: Runs ESLint and Prettier on staged files
2. **commit-msg**: Validates commit message format (conventional commits)

To bypass hooks (not recommended):
```bash
git commit --no-verify
```

## Commit Messages

Use conventional commit format:
```
feat: add new student dashboard
fix: resolve authentication token issue
docs: update API documentation
style: fix code formatting
refactor: simplify student data fetching
test: add tests for user registration
chore: update dependencies
```

Or use the interactive tool:
```bash
npm run commit
```

## Code Style

### ESLint Rules
- Prettier integration for formatting
- React-specific rules enabled
- No console logs in production (warnings allowed for debug)
- Modern ES6+ patterns enforced

### Prettier Configuration
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in ES5 contexts
- 80 character line width

## Testing

### Test Structure
- Unit tests with React Testing Library
- Component integration tests
- Custom test utilities in `src/tests/test-utils.js`

### Coverage Requirements
- Aim for >80% coverage
- Focus on critical user paths
- Test user interactions, not implementation details

## Performance

### Bundle Analysis
```bash
npm run build
npx serve -s build
```

### Performance Monitoring
- Web Vitals integration
- Development performance logging
- Bundle size tracking

## VS Code Setup

Install recommended extensions:
- ESLint
- Prettier
- Auto Rename Tag
- Path Intellisense

Settings are configured in `.vscode/settings.json`.

## Troubleshooting

### Common Issues

1. **ESLint/Prettier conflicts**: Run `npm run lint:fix` followed by `npm run format`
2. **Pre-commit hooks failing**: Check staged files with `git status` and fix issues
3. **Test failures**: Run `npm test` to see detailed error messages
4. **Build issues**: Clear cache with `rm -rf node_modules package-lock.json && npm install`

### Debug Mode

```bash
# Run with debug output
DEBUG=* npm start

# Test with verbose output
npm test -- --verbose

# ESLint debug
DEBUG=eslint:* npm run lint
```

## Deployment

### Environment Variables
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_VERSION`: Application version

### Build Process
1. Run all quality checks: `npm run validate`
2. Create production build: `npm run build`
3. Test build locally: `npx serve -s build`

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes following code style guidelines
3. Add tests for new functionality
4. Run quality checks: `npm run validate`
5. Commit using conventional format: `npm run commit`
6. Push and create pull request

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs:
- Linting and formatting checks
- Full test suite with coverage
- Security audit
- Production build verification

All checks must pass before merging to master.