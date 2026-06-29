# User Management Dashboard (React + Express Monorepo)

A highly polished, responsive User Management Dashboard featuring a React frontend (Vite + Vanilla CSS) and a Node.js/Express backend service. This project allows administrators to manage an organization directory with full CRUD (Create, Read, Update, Delete) capability.

Rather than making mutations directly to the read-only JSONPlaceholder API (which doesn't persist changes), this project uses a Node/Express backend to fetch initial seed data from JSONPlaceholder, normalize it, and manage it using an in-memory datastore. This achieves **real-time session persistence** for all operations.

---

## 🌐 Live Deployment

- **Frontend (Vercel)**: [https://frontendusermanagementdashboard.vercel.app/](https://frontendusermanagementdashboard.vercel.app/)
- **Backend API (Render)**: [https://tacnique-backend-756p.onrender.com](https://tacnique-backend-756p.onrender.com)
  - API Health Check: [https://tacnique-backend-756p.onrender.com/health](https://tacnique-backend-756p.onrender.com/health)
  - Users API: [https://tacnique-backend-756p.onrender.com/api/users](https://tacnique-backend-756p.onrender.com/api/users)

---

## 🚀 Quick Start & Run Instructions

Ensure you have **Node.js** (version 18+) installed.

### 1. Clone the repository & Install root packages
First, install the root workspace coordinator packages:
```bash
npm install
```

### 2. Install all subfolder dependencies
Install dependencies for both the `frontend/` and `backend/` concurrently using the workspace script:
```bash
npm run install-all
```

### 3. Run the development environments
Launch both the Express backend and Vite frontend servers in parallel with a single command:
```bash
npm run dev
```
- **Frontend** will start locally at: [http://localhost:5173](http://localhost:5173)
- **Backend API** will start locally at: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

### 4. Running Unit Tests
You can run tests for each environment separately:
- **Test Backend Routes & CRUD**: `npm run test:backend`
- **Test Frontend Form Validators & Helpers**: `npm run test:frontend`

---

## 📂 Folder Structure Map

```
tacnique/
├── package.json                      # Monorepo task scripts & devDependencies
├── README.md                         # Project documentation
├── backend/                          # Node.js + Express API
│   ├── package.json                  # Backend packages & scripts
│   ├── tests/
│   │   └── user.test.js              # Supertest route tests
│   └── src/
│       ├── server.js                 # Express server entry point
│       ├── controllers/
│       │   └── userController.js     # Validations & controller handlers
│       ├── routes/
│       │   └── userRoutes.js         # API endpoints routing
│       └── services/
│       │   └── dataStore.js          # In-memory database with sorting & filters
│       └── utils/
│           └── userSeeder.js         # Seeder fetching from JSONPlaceholder
└── frontend/                         # React Application
    ├── package.json                  # Frontend scripts & Vite configs
    ├── index.html                    # Root HTML
    ├── tests/
    │   └── utils.test.js             # Vitest frontend utility tests
    └── src/
        ├── main.jsx                  # React DOM renderer
        ├── App.jsx                   # Central state & UI layout
        ├── api/
        │   └── userService.js        # Axios network requests
        ├── hooks/
        │   └── useUsers.js           # Custom hook for filtering and CRUD states
        ├── utils/
        │   ├── constants.js          # Departments and default bounds
        │   ├── validators.js         # Form field validations (RegEx)
        │   └── helpers.js            # Cosmic styles and string utilities
        ├── styles/
        │   ├── variables.css         # Styling colors and gradients
        │   └── index.css             # Main styling classes
        └── components/
            ├── Header.jsx            # Stats banner & action header
            ├── SearchBar.jsx         # Search and department tags
            ├── FilterPopup.jsx       # Slide-out department filter drawer
            ├── UserTable.jsx         # Click-to-sort interactive grid
            ├── UserRow.jsx           # Individual user row controls
            ├── UserForm.jsx          # Modal form for Add/Edit
            ├── ConfirmDelete.jsx     # Safety check prompt modal
            ├── Notification.jsx      # Slide-in toast alerts
            └── SkeletonLoader.jsx    # Pulsing table shimmer loader
```

---

## 🛠️ Tech Stack & Libraries Used

### Backend API
- **Node.js** & **Express**: Web server framework.
- **CORS**: Middleware to handle requests from the Vite dev server port.
- **Axios**: Seeding users from JSONPlaceholder.
- **Vitest** & **Supertest**: API endpoint route validation.
- **Nodemon**: Fast local dev server reload.

### Frontend UI
- **React 19**: Responsive application engine.
- **Vite 8**: Frontend bundling.
- **Vanilla CSS**: Curated, flexible styling utilizing custom HSL properties, gradients, glassmorphism templates, and interactive media queries.
- **Axios**: promise-based HTTP network communications.
- **Vitest**: High-speed JavaScript testing runner.

---

## 📋 Engineering Assumptions

1. **Name Splitting**: Because JSONPlaceholder provides a single `name` string (e.g. `"Leanne Graham"`), the application splits this string at the first white space. The first segment maps to `firstName` and any trailing segments map to `lastName`.
2. **Department Allocation**: JSONPlaceholder does not contain department fields. To build a functioning department filter, the backend seeder allocates a cyclical default department (e.g. "Engineering", "Marketing", "Sales", "Design", "Product") based on the seed index, ensuring clean, predictable data.
3. **Session Persistence**: JSONPlaceholder is a read-only endpoint that does not persist updates. Creating an Express backend acting as a session-based datastore allows CRUD actions (creating, updating details, and deleting profiles) to update state persistently across reloads, making the application function like a real enterprise system.

---

## 🧠 Challenges Faced

- **JSONPlaceholder Mock Limitations**: Handling the mock API's inability to persist data changes was a major consideration. If the frontend sent `POST` or `PUT` requests directly to JSONPlaceholder, subsequent list reloads would overwrite changes. 
  * **Solution**: Solved this by decoupling the network client. Building an Express service that loads seed data on startup and coordinates local memory states guarantees that edits and deletions persist correctly throughout the active web application session.
- **PowerShell compatibility**: Semicolon operators were used instead of `&&` chain commands in scripts to avoid syntax crashes on Windows PowerShell systems.

---

## 🔮 Future Architectural Improvements

If given more time, the following improvements would be integrated:
1. **Persistent Database**: Add MongoDB or PostgreSQL storage instead of in-memory maps to save data across server restarts.
2. **User Authentication**: Implement JWT/OAuth authorization layers so only authenticated administrators can add, edit, or delete members.
3. **Audit Log System**: Store database mutation history to log which administrator deleted or updated a profile.
4. **WebSocket Syncing**: Integrate Socket.io so multiple open dashboard windows reflect additions or updates in real-time.
