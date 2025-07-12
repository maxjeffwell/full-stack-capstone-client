#!/usr/bin/env node

// Simple script to verify development tools are set up correctly
const fs = require('fs');
const path = require('path');

console.log('🔧 Checking development tools setup...\n');

const checks = [
  {
    name: 'Husky pre-commit hook',
    check: () => fs.existsSync('.husky/pre-commit'),
    fix: 'Run: npx husky init && echo "npx lint-staged" > .husky/pre-commit'
  },
  {
    name: 'Prettier configuration',
    check: () => fs.existsSync('.prettierrc'),
    fix: 'Create .prettierrc file with formatting rules'
  },
  {
    name: 'ESLint configuration',
    check: () => fs.existsSync('.eslintrc.js'),
    fix: 'Create .eslintrc.js file with linting rules'
  },
  {
    name: 'VS Code settings',
    check: () => fs.existsSync('.vscode/settings.json'),
    fix: 'Create .vscode/settings.json for editor configuration'
  },
  {
    name: 'EditorConfig',
    check: () => fs.existsSync('.editorconfig'),
    fix: 'Create .editorconfig for consistent code formatting'
  },
  {
    name: 'GitHub Actions CI',
    check: () => fs.existsSync('.github/workflows/ci.yml'),
    fix: 'Create .github/workflows/ci.yml for continuous integration'
  }
];

let allPassed = true;

checks.forEach((check, index) => {
  const passed = check.check();
  const icon = passed ? '✅' : '❌';
  const status = passed ? 'OK' : 'MISSING';
  
  console.log(`${icon} ${check.name}: ${status}`);
  
  if (!passed) {
    console.log(`   Fix: ${check.fix}\n`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 All development tools are properly configured!');
  console.log('\n📝 Available commands:');
  console.log('  npm run lint       - Check code quality');
  console.log('  npm run format     - Format code');
  console.log('  npm run validate   - Run all checks');
  console.log('  npm run commit     - Interactive commit');
  console.log('  npm run deps:check - Check dependencies');
} else {
  console.log('⚠️  Some tools need to be set up. Follow the fixes above.');
  process.exit(1);
}