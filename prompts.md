# PROMPTS:

## 1. Initial Project Setup
In this folder is the very basic project structure. Frontend and backend with basic libraries in the package json already. I need to build a complete full-stack application for tracking flights (mono repo). Here are the detailed requirements:

**Frontend (React + Typescript):**
* Create a modern, responsive UI for flight tracking
* Use TailwindCSS for styles
* Include a form to add new flights to track (flight number input)
* Display a list/table of all tracked flights showing:
* Flight number
* Current status (AWAITING, DEPARTED, ARRIVED)
* Actual departure time (if available)
* Actual arrival time (if available)
* Delete button for each flight
* Add a "Refresh All" button to update status of all tracked flights
* Use local storage to persist the list of tracked flights
* Implement proper error handling and loading states

**Backend (Express.js + TypeScript):**
* Create RESTful API endpoints:
* POST /api/flights/track - Add new flight to tracking
* GET /api/flights - Get all tracked flights with current status
* DELETE /api/flights/:flightNumber - Remove flight from tracking
* POST /api/flights/refresh - Refresh status of all tracked flights
* Implement two mock flight data providers:
* Flight Aware provider
* Flight Stats provider
* Each provider should:
* Accept a flight number as input
* Return: { actualDepartureTime: string | null, actualArrivalTime: string | null }
* Or return error: { error: string }
* Mock realistic flight data with delays, cancellations, etc.

**Technical Requirements:**
* Use TypeScript for both frontend and backend
* Implement proper error handling
* Add comprehensive tests (unit tests for both frontend and backend)
* Create mock data that simulates real flight scenarios
* Use modern React patterns (hooks, functional components)
* Implement proper TypeScript interfaces/types
* Add README with setup and usage instructions

**Mock Data Considerations:**
* Vary departure/arrival times
* Include different airlines and flight numbers
* Simulate network delays and API failures

**Additional Notes:**
* No authentication or database required
* Focus on clean, maintainable code
* Prepare to discuss authentication, database, logging, and deployment considerations

Include error handling and realistic mock data throughout the development process.

---

## 2. Testing Requirements
Please add unit tests to the backend services testing the tracking logic and verify they actually pass

---

## 3. Documentation Requirements
Please create a readme.md documenting the project, its monorepo structure, how to initialize and test it, and a brief general overview
