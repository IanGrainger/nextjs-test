# Messages Dashboard

A Next.js TypeScript application displaying a table of messages with delivery status tracking. Built with Tailwind CSS for styling and Vitest for testing.

## Features

- **Message Table**: Displays message data with columns for GUID, From Code, To Code, Correspondent Name, and Status
- **Status Indicators**: Color-coded status badges (delivered, failed, pending)
- **Server Data**: Fetches message data from a JSON file in the public directory
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive UI
- **Comprehensive Tests**: Full test coverage with Vitest and React Testing Library

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page with message table
│   ├── page.test.tsx     # Tests for the main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── MessageTable.tsx      # Message table component
│   └── MessageTable.test.tsx # Tests for the component
public/
└── data/
    └── messages.json     # Sample message data
```

## Data Format

The `public/data/messages.json` file contains an array of message objects:

```json
[
  {
    "guid": "550e8400-e29b-41d4-a716-446655440000",
    "fromCode": "SENDER001",
    "toCode": "RECVR001",
    "correspondentName": "John Smith",
    "status": "delivered"
  }
]
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Testing

Run the test suite:

```bash
npm run test            # Run tests in watch mode
npm run test:run        # Run tests once
npm run test:ui         # Run tests with UI
```

### Build

Build the application for production:

```bash
npm run build
npm run start
```

### Linting

Check code with ESLint:

```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with Vitest UI
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities

## Testing

The project includes comprehensive tests:

- **Homepage Tests**: Verifies table rendering, data loading, error handling, and empty states
- **MessageTable Component Tests**: Tests table headers, message rows, status badges, and empty state

All 8 tests pass successfully.
