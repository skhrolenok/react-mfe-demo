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

### Individual Commands

```bash
# Build all apps
npm run build

# Serve all built apps (after build)
npm run serve

# Build specific app
npm run build --workspace=shell
npm run build --workspace=mfe-user-management
npm run build --workspace=mfe-ticketing

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
