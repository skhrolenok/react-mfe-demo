# Voltify Portal - Micro Frontend Demo

⚡ **Powered by Module Federation** ⚡

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

## Development

### Build + Serve All Apps

**Single command to build and serve all apps:**

```bash
npm run dev
```

This will:
1. Build all apps (shell + MFEs)
2. Start servers on ports 3000, 3001, 3002

**Access at:**
- Shell: http://localhost:3000
- User MFE: http://localhost:3001
- Ticketing MFE: http://localhost:3002

> **Note:** Module Federation with Vite requires building before serving. The `npm run dev` command handles both steps automatically.

### Individual Development Commands

```bash
# Build all apps
npm run build

# Serve all built apps (after build)
npm run serve

# Build specific app
npm run build --workspace=shell
npm run build --workspace=mfe-user-management
npm run build --workspace=mfe-ticketing

# Start specific app (production)
npm run start --workspace=shell
npm run start --workspace=mfe-user-management
npm run start --workspace=mfe-ticketing

# Lint all
npm run lint

# Test all
npm run test

# Clean all (remove node_modules and builds)
npm run clean
```

## Production Deployment

### Start Production Servers

```bash
# 1. Build all apps
npm run build

# 2. Start production servers (Express with SPA routing)
npm run start
```

This starts Express.js servers that:
- Serve static files from `dist/` directories
- Handle client-side routing (all routes → `index.html`)
- Work correctly with refresh on any route

### Environment Variables

```bash
# Shell app (required for production MFE URLs)
VITE_MFE_USER_URL=https://mfe-user-management.yourdomain.com
VITE_MFE_TICKET_URL=https://mfe-ticketing.yourdomain.com
PORT=3000

# MFE User Management
PORT=3001

# MFE Ticketing
PORT=3002
```

### Deployment Steps

1. **Set environment variables for MFE URLs:**
```bash
export VITE_MFE_USER_URL=https://mfe-user-management.yourdomain.com
export VITE_MFE_TICKET_URL=https://mfe-ticketing.yourdomain.com
```

2. **Build all apps:**
```bash
npm run build
```

3. **Start all services:**
```bash
npm run start
```

### Deploy Individual MFEs

```bash
# Build and deploy specific MFE
npm run build --workspace=mfe-user-management
npm run start --workspace=mfe-user-management
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
COPY apps/ ./apps/
COPY packages/ ./packages/
COPY turbo.json ./

RUN npm install
RUN npm run build

EXPOSE 3000 3001 3002

CMD ["npm", "run", "start"]
```

## Navigation

- **Home**: `/` - Portal landing page
- **Users**: `/users` - User Management MFE
- **Tickets**: `/tickets` - Ticketing MFE

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
