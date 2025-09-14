# Item Manager

A simple React/TypeScript application for managing a list of items. Built with modern frontend technologies and clean architecture principles.

## Features

- Add new items to the list
- Remove items from the list
- Clear all items
- Data persistence with localStorage
- Responsive design
- TypeScript for type safety

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Vitest (testing)
- React Testing Library

## Project Structure

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
```

The project follows Feature-Sliced Design architecture for better code organization and maintainability.

## Getting Started

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

# Testing
npm run test         # Run tests
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

## Testing

The project includes unit tests for components and custom hooks. Run tests with:

```bash
npm run test
```

## Architecture

The project uses Feature-Sliced Design (FSD) architecture:

- **app/** - Application composition layer
- **widgets/** - Complex UI blocks
- **features/** - Business features (add-item, remove-item)
- **entities/** - Business entities (item)
- **shared/** - Reusable code (UI components, utilities, hooks)

## Key Features

- Custom hooks for state management (`useItemsManager`, `useLocalStorage`)
- Reusable UI components (Button, Input, Card, Modal)
- TypeScript for type safety
- localStorage for data persistence
- Responsive design with Tailwind CSS
- Unit tests with Vitest and React Testing Library
