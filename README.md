# Flight Tracker - Full Stack Application

A complete full-stack application for tracking flights built with React (TypeScript) frontend and Express.js (TypeScript) backend.

## Project Structure

```
flight-tracker-monorepo/
├── frontend/          # React TypeScript application
├── backend/           # Express.js TypeScript API
├── package.json       # Root workspace configuration
└── README.md         # This file
```

## Features

### Frontend (React + TypeScript)
- Modern, responsive UI for flight tracking
- Form to add new flights to track
- Display list/table of tracked flights
- Flight status management (AWAITING, DEPARTED, ARRIVED)
- Local storage persistence
- Error handling and loading states
- "Refresh All" functionality

### Backend (Express.js + TypeScript)
- RESTful API endpoints
- Mock flight data providers (FlightAware, FlightStats)
- Realistic flight scenarios simulation
- Comprehensive error handling
- TypeScript interfaces and types

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd flight-tracker-monorepo
   npm install
   ```

2. **Install workspace dependencies:**
   ```bash
   npm run install:all
   ```

### Development

1. **Start both frontend and backend:**
   ```bash
   npm run dev
   ```

2. **Start only backend:**
   ```bash
   npm run dev:backend
   ```

3. **Start only frontend:**
   ```bash
   npm run dev:frontend
   ```

### Build

```bash
npm run build
```

### Testing

```bash
npm run test
```

## API Endpoints

- `GET /health` - Health check
- `POST /api/flights/track` - Add new flight to tracking
- `GET /api/flights` - Get all tracked flights
- `DELETE /api/flights/:flightNumber` - Remove flight from tracking
- `POST /api/flights/refresh` - Refresh status of all tracked flights

## Ports

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Technology Stack

- **Frontend:** React 18, TypeScript, Create React App
- **Backend:** Express.js, TypeScript, Node.js
- **Development:** Nodemon, Concurrently
- **Package Management:** npm workspaces