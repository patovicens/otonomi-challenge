# ✈️ Flight Tracker

A simple flight tracking application built with React, TypeScript, Express.js, and TailwindCSS. Track flights with mock data providers that simulate realistic flight scenarios.

## 🚀 Features

- **Flight tracking** - Add and track flight numbers
- **Real-time status updates** - AWAITING, DEPARTED, ARRIVED
- **Mock data providers** - FlightAware & FlightStats simulation
- **Local storage** - Persist tracked flights
- **Responsive UI** - Works on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, TailwindCSS
- **Backend**: Express.js, TypeScript, Jest
- **Monorepo**: npm Workspaces

## 📋 Prerequisites

- Node.js (v16+)
- npm

## 🚀 Quick Start

```bash
# Clone and install
git clone <repository-url>
cd otonomi-challenge
npm run install:all

# Start development servers
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific tests
npm run test:backend
npm run test:frontend
```

## 📚 API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/flights/track` | Track a new flight |
| `GET` | `/api/flights` | Get all tracked flights |
| `DELETE` | `/api/flights/:flightNumber` | Remove flight |
| `POST` | `/api/flights/refresh` | Refresh all flights |

## 🎯 Flight Status

- **AWAITING** - Flight is scheduled
- **DEPARTED** - Flight has taken off
- **ARRIVED** - Flight has landed

## 🔧 Development

```bash
# Start both servers
npm run dev

# Start individual servers
npm run dev:backend
npm run dev:frontend

# Build for production
npm run build
```