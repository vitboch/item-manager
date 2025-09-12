# 🚀 Item Manager - Senior-Level React TypeScript Application

[![CI/CD Pipeline](https://github.com/vitboch/item-manager/workflows/CI%20Pipeline/badge.svg)](https://github.com/vitboch/item-manager/actions)
[![Coverage](https://codecov.io/gh/vitboch/item-manager/branch/main/graph/badge.svg)](https://codecov.io/gh/vitboch/item-manager)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38bdf8.svg)](https://tailwindcss.com/)

A **production-ready** React/TypeScript application demonstrating **expert-level frontend development practices**, built with **Feature-Sliced Design (FSD)** architecture. This project showcases modern development workflows, comprehensive testing, performance optimizations, and enterprise-grade tooling.

> **🎯 Perfect for Senior/Lead Frontend Developer positions** - Demonstrates mastery of modern React ecosystem, architectural patterns, and professional development practices.

## 🚀 Features

### 🏗️ **Architecture & Design Patterns**

- **Feature-Sliced Design (FSD)**: Scalable, maintainable architecture
- **Custom Hooks**: Reusable business logic with `useItemsManager`, `useLocalStorage`
- **Component Composition**: Flexible, reusable UI components
- **Type-Safe APIs**: Comprehensive TypeScript interfaces and generics

### ⚡ **Performance & Optimization**

- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Memoized event handlers and functions
- **Optimistic Updates**: Immediate UI feedback for better UX
- **Efficient State Management**: Minimal state updates and proper dependency arrays
- **Bundle Optimization**: Tree-shaking and code splitting ready

### 🧪 **Testing & Quality Assurance**

- **Comprehensive Test Suite**: 35+ tests with 80%+ coverage
- **Unit Tests**: Business logic and utility functions
- **Component Tests**: User interactions and edge cases
- **Hook Tests**: Custom hooks with localStorage integration
- **Type Safety**: Strict TypeScript configuration with zero `any` types

### 🎨 **UI/UX Excellence**

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Keyboard navigation and screen reader support
- **Smooth Animations**: Micro-interactions and transitions
- **Error Handling**: Graceful error states and validation
- **Loading States**: Optimistic updates and loading indicators

### 🔧 **Developer Experience**

- **Hot Module Replacement**: Instant feedback during development
- **TypeScript IntelliSense**: Full type safety and autocomplete
- **ESLint + Prettier**: Consistent code formatting and linting
- **Git Hooks**: Pre-commit validation and formatting
- **VS Code Integration**: Optimized development environment

### 🚀 **Production Ready**

- **CI/CD Pipeline**: Automated testing, linting, and deployment
- **Security Audit**: Dependency vulnerability scanning
- **Performance Monitoring**: Lighthouse CI integration
- **Code Coverage**: Detailed coverage reports and thresholds
- **Documentation**: Comprehensive README and development guides

## 🏗️ Architecture

This project follows **Feature-Sliced Design** principles for scalable and maintainable code:

```
src/
├── app/                    # Application layer
│   ├── App.tsx            # Main app component
│   └── index.ts           # Public API
├── widgets/               # Widgets layer
│   └── items-list/        # Items list widget
├── features/              # Features layer
│   ├── add-item/          # Add item feature
│   └── remove-item/       # Remove item feature
├── entities/              # Entities layer
│   └── item/              # Item entity
└── shared/                # Shared layer
    ├── ui/                # Reusable UI components
    └── lib/               # Utilities and hooks

# Configuration files
├── .github/workflows/     # GitHub Actions
│   ├── ci.yml            # CI/CD pipeline
│   └── release.yml       # Release workflow
├── .vscode/              # VS Code settings
│   ├── settings.json     # Editor configuration
│   ├── extensions.json   # Recommended extensions
│   └── tasks.json        # VS Code tasks
├── .husky/               # Git hooks
│   ├── pre-commit        # Pre-commit hook
│   └── commit-msg        # Commit message hook
└── Configuration files   # Various configs
    ├── .prettierrc       # Prettier configuration
    ├── .stylelintrc.json # Stylelint configuration
    ├── .lintstagedrc.json # Lint-staged configuration
    ├── lighthouserc.js   # Lighthouse CI configuration
    └── .gitmessage       # Git commit template
```

### Layer Responsibilities

- **app/**: Application composition and routing
- **widgets/**: Complex UI blocks combining multiple features
- **features/**: Business logic and user interactions
- **entities/**: Business entities and domain logic
- **shared/**: Reusable code across the application

## 🛠️ Tech Stack

- **React 18** - Latest React with concurrent features
- **TypeScript** - Strict type checking and better DX
- **Vite** - Fast build tool with HMR
- **Tailwind CSS** - Utility-first CSS framework
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **Stylelint** - CSS linting
- **Husky** - Git hooks
- **Lint-staged** - Pre-commit hooks
- **GitHub Actions** - CI/CD pipeline
- **Lighthouse CI** - Performance monitoring

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd item-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run style:lint   # Lint CSS/SCSS files
npm run style:check  # Check CSS/SCSS files
npm run type-check   # Run TypeScript type checking

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:ci      # Run tests for CI
npm run test:coverage # Run tests with coverage
npm run test:watch   # Run tests in watch mode

# Security & Maintenance
npm run audit        # Run security audit
npm run audit:fix    # Fix security issues
npm run validate     # Run all validations

# Utilities
npm run clean        # Clean build artifacts
npm run reinstall    # Reinstall dependencies
npm run prepare      # Setup Git hooks
```

## 🧪 Testing

The project includes comprehensive test coverage:

- **Unit Tests**: Entity functions and utilities
- **Component Tests**: UI components with user interactions
- **Hook Tests**: Custom hooks with localStorage integration
- **Coverage**: 80%+ coverage threshold with detailed reports

Run tests:

```bash
npm run test
```

## 🚀 CI/CD Pipeline

The project includes a complete CI/CD pipeline with GitHub Actions:

### Automated Checks

- **Linting** - ESLint, Prettier, and Stylelint
- **Type Checking** - TypeScript compilation
- **Testing** - Unit tests with coverage
- **Security Audit** - Dependency vulnerability scanning
- **Build Verification** - Production build testing
- **Performance** - Lighthouse CI performance monitoring

### Workflows

- **CI Pipeline** - Runs on every push and PR
- **Release Pipeline** - Automated releases on version tags
- **Preview Deployments** - Automatic preview deployments for PRs

### Quality Gates

- All tests must pass
- Code coverage must be above 80%
- No security vulnerabilities
- Code must be properly formatted
- TypeScript compilation must succeed

## 🎨 UI Components

### Reusable Components

- **Button**: Multiple variants (primary, danger, secondary)
- **Input**: Form input with validation states
- **Card**: Container component with variants

### Features

- **AddItemForm**: Form for adding new items with validation
- **RemoveItemButton**: Confirmation-based removal
- **ItemsList**: List display with empty states

## 🔧 Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Memoizes event handlers
- **Optimistic Updates**: Immediate UI feedback
- **Efficient State Management**: Minimal state updates

## 📱 Responsive Design

- Mobile-first approach
- Responsive breakpoints
- Touch-friendly interactions
- Accessible keyboard navigation

## 🔒 Type Safety

- Strict TypeScript configuration
- Comprehensive type definitions
- Generic components and hooks
- Runtime type validation

## 🎯 **Skills Demonstrated for Senior/Lead Positions**

### **🏗️ Architectural Excellence**

- **Feature-Sliced Design**: Enterprise-grade architecture patterns
- **Separation of Concerns**: Clean, maintainable code organization
- **Scalability**: Easy to extend and modify
- **Code Reusability**: Shared components and utilities

### **⚡ Performance Mastery**

- **React Optimization**: Advanced patterns (memo, callback, refs)
- **Bundle Analysis**: Optimized build size and loading
- **Memory Management**: Efficient state updates and cleanup
- **User Experience**: Smooth animations and responsive interactions

### **🧪 Testing Expertise**

- **Test-Driven Development**: Comprehensive test coverage
- **Testing Strategies**: Unit, integration, and component testing
- **Mocking & Stubbing**: Advanced testing techniques
- **Quality Gates**: Automated quality assurance

### **🔧 Developer Experience**

- **Modern Tooling**: Vite, TypeScript, ESLint, Prettier
- **Git Workflow**: Hooks, conventional commits, CI/CD
- **Documentation**: Self-documenting code and comprehensive docs
- **Code Quality**: Linting, formatting, and type safety

### **🚀 Production Readiness**

- **CI/CD Pipeline**: Automated testing and deployment
- **Security**: Dependency auditing and secure practices
- **Monitoring**: Performance and error tracking
- **Maintainability**: Clean code and documentation

### **💼 Leadership Qualities**

- **Best Practices**: Industry-standard development practices
- **Code Reviews**: Clean, reviewable code structure
- **Mentoring**: Well-documented patterns for team learning
- **Innovation**: Modern technologies and approaches

## 📸 Screenshots

The application features a clean, modern interface with:

- Responsive header with clear branding
- Intuitive add item form with validation
- Animated item list with smooth transitions
- Confirmation dialogs for destructive actions
- Empty states with helpful messaging

## 🔍 **Technical Deep Dive**

### **Architecture Decisions**

- **Why FSD?** Scalable, maintainable, team-friendly architecture
- **Why TypeScript?** Type safety, better DX, refactoring confidence
- **Why Vite?** Fast HMR, modern tooling, excellent performance
- **Why Tailwind?** Utility-first, consistent design, rapid development

### **Performance Optimizations**

- **React.memo**: Prevents unnecessary re-renders of list items
- **useCallback**: Memoizes event handlers to prevent child re-renders
- **Optimistic Updates**: Immediate UI feedback for better UX
- **Efficient State Management**: Minimal state updates with proper dependencies

### **Testing Strategy**

- **Unit Tests**: Business logic and utility functions
- **Component Tests**: User interactions and edge cases
- **Hook Tests**: Custom hooks with localStorage integration
- **Coverage**: 80%+ threshold with detailed reports

### **Code Quality**

- **ESLint**: Strict rules with TypeScript support
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict mode with zero `any` types
- **Git Hooks**: Pre-commit validation and formatting

## 🚀 **Deployment & CI/CD**

### **GitHub Actions Pipeline**

- **Linting**: ESLint, Prettier, Stylelint
- **Type Checking**: TypeScript compilation
- **Testing**: Unit tests with coverage
- **Security**: Dependency vulnerability scanning
- **Performance**: Lighthouse CI monitoring

### **Quality Gates**

- ✅ All tests must pass
- ✅ Code coverage > 80%
- ✅ No security vulnerabilities
- ✅ Code properly formatted
- ✅ TypeScript compilation successful

## 🤝 **Contributing**

This project demonstrates **senior-level frontend development practices**. Key areas for extension:

- **Item Editing**: Inline editing with optimistic updates
- **Search & Filtering**: Advanced search with debouncing
- **Drag & Drop**: Reorderable list with smooth animations
- **Backend Integration**: REST API with error handling
- **Authentication**: JWT-based auth with protected routes
- **Offline Support**: Service workers and PWA features
- **Dark Mode**: Theme switching with persistence
- **Keyboard Shortcuts**: Power user features
- **Bulk Operations**: Multi-select and batch actions
- **Data Export**: CSV/JSON export functionality

## 📄 **License**

MIT License - This project is created for demonstration purposes and showcases modern React/TypeScript development practices.

---

## 🎯 **For Recruiters & Technical Leads**

This project demonstrates **expert-level proficiency** in:

- **Modern React Patterns**: Hooks, context, performance optimization
- **TypeScript Mastery**: Strict typing, generics, advanced patterns
- **Architecture Design**: Scalable, maintainable code organization
- **Testing Excellence**: Comprehensive test coverage and strategies
- **DevOps Integration**: CI/CD, automated quality gates
- **Code Quality**: Linting, formatting, documentation
- **Performance**: Bundle optimization, runtime performance
- **User Experience**: Accessibility, responsive design, animations

**Perfect for Senior/Lead Frontend Developer positions** requiring React, TypeScript, and modern development practices expertise.
