# Siemens Energy Portal - Micro Frontend Demo

A demonstration of Micro Frontend architecture using **Module Federation** with **Vite** and **React**.

## Architecture

This demo showcases:
- **Shell Application**: Main container app that loads MFEs dynamically
- **MFE User Management**: User listing and management micro-frontend
- **MFE Ticketing**: Ticket tracking micro-frontend
- **Shared Packages**: UI Kit, Types, and Event Contracts

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | React 18 + Vite |
| MFE Integration | Module Federation Plugin |
| Monorepo | npm workspaces + turbo |
| Routing | React Router v6 |
| Styling | CSS Modules |

## Project Structure

```
react-mfe-demo/
├── apps/
│   ├── shell/                 # Main shell app (port 3000)
│   ├── mfe-user-management/   # User MFE (port 3001)
│   └── mfe-ticketing/         # Ticketing MFE (port 3002)
├── packages/
│   ├── ui-kit/                # Shared UI components
│   ├── types/                 # TypeScript types
│   └── event-contracts/       # Event definitions
├── package.json
└── turbo.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
cd react-mfe-demo
npm install
```

### Development (Build + Serve)

**Single command to build and serve all apps:**

```bash
npm run dev
# This will:
# 1. Build all apps (shell + MFEs)
# 2. Start servers on ports 3000, 3001, 3002
# 
# Access at:
# - Shell: http://localhost:3000
# - User MFE: http://localhost:3001
# - Ticketing MFE: http://localhost:3002
```

> **Note:** Module Federation with Vite requires building before serving. The `npm run dev` command now handles both steps automatically.

### Production Deployment

**For production (with proper SPA routing):**

```bash
# 1. Set environment variables for MFE URLs
export VITE_MFE_USER_URL=https://mfe-user-management.onrender.com
export VITE_MFE_TICKET_URL=https://mfe-ticketing.onrender.com

# 2. Build all apps (will use production MFE URLs)
npm run build

# 3. Start production servers (Express with SPA routing)
npm run start
```

This starts Express.js servers that:
- Serve static files from `dist/` directories
- Handle client-side routing (all routes → `index.html`)
- Use production MFE URLs (not localhost!)
- Work correctly with refresh on any route

**Environment Variables:**
```bash
# Shell app (required)
VITE_MFE_USER_URL=https://mfe-user-management.onrender.com
VITE_MFE_TICKET_URL=https://mfe-ticketing.onrender.com
PORT=3000

# MFE User Management
PORT=3001

# MFE Ticketing
PORT=3002
```

### Deployment to Render.com / Other Hosting

**Important: Configure MFE URLs**

The shell app needs to know where to find the MFEs. Set these environment variables when deploying:

- `VITE_MFE_USER_URL` - URL of User Management MFE
- `VITE_MFE_TICKET_URL` - URL of Ticketing MFE

**Option 1: Deploy each MFE separately (Recommended)**

For each app (shell, mfe-user-management, mfe-ticketing):

1. Create `.env` file or set environment variables in hosting platform:
```bash
# For Shell app
VITE_MFE_USER_URL=https://your-mfe-user-app.onrender.com
VITE_MFE_TICKET_URL=https://your-mfe-ticket-app.onrender.com
```

2. Build the app:
```bash
npm run build --workspace=shell
```

3. Deploy the `dist` folder + `server.js` + `package.json`

4. Set start command:
```bash
node server.js
```

5. Set environment variables in hosting platform dashboard

**Option 2: Deploy as monorepo**

1. Set environment variables:
```bash
export VITE_MFE_USER_URL=https://mfe-user-management.onrender.com
export VITE_MFE_TICKET_URL=https://mfe-ticketing.onrender.com
```

2. Build all:
```bash
npm run build
```

3. Set start command:
```bash
npm run start
```

**render.yaml example:**
```yaml
services:
  - type: web
    name: shell
    env: node
    buildCommand: npm install && npm run build --workspace=shell
    startCommand: cd apps/shell && npm run start
    envVars:
      - key: PORT
        value: 3000
      - key: VITE_MFE_USER_URL
        value: https://mfe-user-management.onrender.com
      - key: VITE_MFE_TICKET_URL
        value: https://mfe-ticketing.onrender.com

  - type: web
    name: mfe-user-management
    env: node
    buildCommand: npm install && npm run build --workspace=mfe-user-management
    startCommand: cd apps/mfe-user-management && npm run start
    envVars:
      - key: PORT
        value: 3001

  - type: web
    name: mfe-ticketing
    env: node
    buildCommand: npm install && npm run build --workspace=mfe-ticketing
    startCommand: cd apps/mfe-ticketing && npm run start
    envVars:
      - key: PORT
        value: 3002
```

**Environment-specific builds:**

```bash
# Development
npm run build

# Staging
VITE_MFE_USER_URL=https://staging-user.onrender.com \
VITE_MFE_TICKET_URL=https://staging-ticket.onrender.com \
npm run build

# Production
VITE_MFE_USER_URL=https://prod-user.onrender.com \
VITE_MFE_TICKET_URL=https://prod-ticket.onrender.com \
npm run build
```

### Individual Commands

```bash
# Build all apps
npm run build

# Serve all built apps (after build) - dev mode
npm run serve

# Start production servers (Express with SPA routing)
npm run start

# Build specific app
npm run build --workspace=shell
npm run build --workspace=mfe-user-management
npm run build --workspace=mfe-ticketing

# Start specific app (production)
npm run start --workspace=shell
npm run start --workspace=mfe-user-management
npm run start --workspace=mfe-ticketing

# Clean all (remove node_modules and builds)
npm run clean
```

## Features

### User Management MFE
- List of users with mock data
- Filter by status (Active/Inactive)
- User cards with avatar, role, and department
- Role badges (Admin, Manager, User)

### Ticketing MFE
- List of tickets in progress
- Filter by priority (High/Medium/Low)
- Ticket details with description
- Priority and status badges
- Responsive table layout

### Shared UI Kit
- Card component
- Button component (Primary, Secondary, Danger)
- Badge component (Green, Yellow, Red, Blue, Gray)
- Spinner component

## Module Federation Configuration

### Shell (Host)
```js
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    mfe_user_management: 'mfe_user_management@http://localhost:3001/remoteEntry.js',
    mfe_ticketing: 'mfe_ticketing@http://localhost:3002/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
  },
})
```

### MFEs (Remotes)
```js
new ModuleFederationPlugin({
  name: 'mfe_user_management',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App.tsx',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
  },
})
```

## Navigation

- **Home**: `/` - Portal landing page
- **Users**: `/users` - User Management MFE
- **Tickets**: `/tickets` - Ticketing MFE

## Mock Data

### Users
- 6 sample users with different roles and departments
- Status: Active/Inactive

### Tickets
- 6 tickets in progress
- Priorities: High, Medium, Low
- Assigned to different users

## Benefits of Module Federation over Iframe

1. **Shared Dependencies**: React loaded once, not per MFE
2. **Seamless Integration**: MFEs render as native components
3. **Better UX**: No iframe scroll issues, unified styling
4. **Performance**: Smaller bundle size, faster load times
5. **Type Safety**: Shared TypeScript types across MFEs

## License

MIT
