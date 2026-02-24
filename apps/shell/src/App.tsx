import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Card, Spinner } from '@siemens-energy/ui-kit';

// Lazy load MFEs with Module Federation for full pages
const UserManagementApp = React.lazy(() => import('mfe_user_management/App'));
const TicketingApp = React.lazy(() => import('mfe_ticketing/App'));

// Dashboard widgets with proper error handling
function UserDashboardWidget() {
  const [Widget, setWidget] = React.useState<React.ComponentType | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  useEffect(() => {
    // Dynamic import with error handling
    import('mfe_user_management/DashboardWidget')
      .then((mod) => {
        setWidget(() => mod.default.UserDashboardWidget);
      })
      .catch((err) => {
        console.error('Failed to load UserDashboardWidget:', err);
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <Card title="👥 User Management">
        <div style={styles.errorState}>Failed to load widget</div>
      </Card>
    );
  }

  if (!Widget) {
    return (
      <Card title="👥 User Management">
        <div style={styles.loadingState}><Spinner /></div>
      </Card>
    );
  }

  return <Widget />;
}

function TicketDashboardWidget() {
  const [Widget, setWidget] = React.useState<React.ComponentType | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  useEffect(() => {
    // Dynamic import with error handling
    import('mfe_ticketing/TicketDashboardWidget')
      .then((mod) => {
        setWidget(() => mod.default.TicketDashboardWidget);
      })
      .catch((err) => {
        console.error('Failed to load TicketDashboardWidget:', err);
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <Card title="🎫 Ticketing System">
        <div style={styles.errorState}>Failed to load widget</div>
      </Card>
    );
  }

  if (!Widget) {
    return (
      <Card title="🎫 Ticketing System">
        <div style={styles.loadingState}><Spinner /></div>
      </Card>
    );
  }

  return <Widget />;
}

function Navigation() {
  const location = useLocation();
  const [showSecret, setShowSecret] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogoClick = () => {
    setShowSecret(prev => !prev);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navBrand}>
        <div style={styles.logoWrapper} onClick={handleLogoClick}>
          <span style={{...styles.logo, ...(showSecret ? styles.logoReveal : {})}}>⚡</span>
          <span style={{...styles.brandText, ...(showSecret ? styles.brandTextReveal : {})}}>
            {showSecret ? 'Siemens Energy Portal' : 'Voltify'}
          </span>
        </div>
      </div>
      <div style={styles.navLinks}>
        <Link
          to="/"
          style={{
            ...styles.navLink,
            ...(isActive('/') ? styles.navLinkActive : {}),
          }}
        >
          Home
        </Link>
        <Link
          to="/users"
          style={{
            ...styles.navLink,
            ...(isActive('/users') ? styles.navLinkActive : {}),
          }}
        >
          Users
        </Link>
        <Link
          to="/tickets"
          style={{
            ...styles.navLink,
            ...(isActive('/tickets') ? styles.navLinkActive : {}),
          }}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
}

function HomePage() {
  const [showUserWidget, setShowUserWidget] = useState(true);
  const [showTicketWidget, setShowTicketWidget] = useState(false);

  return (
    <div style={styles.homeContainer}>
      <Card title="⚡ Welcome to Voltify">
        <p style={styles.homeText}>
          This is a demo application showcasing Micro Frontend architecture using Module Federation.
        </p>
        
        {/* Widget Toggle Controls */}
        <div style={styles.toggleContainer}>
          <label style={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={showUserWidget}
              onChange={(e) => setShowUserWidget(e.target.checked)}
              style={styles.checkbox}
            />
            Show User Management Widget
          </label>
          <label style={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={showTicketWidget}
              onChange={(e) => setShowTicketWidget(e.target.checked)}
              style={styles.checkbox}
            />
            Show Ticketing Widget
          </label>
        </div>
      </Card>

      <div style={styles.dashboardGrid}>
        {showUserWidget ? (
          <React.Suspense
            fallback={
              <Card title="👥 User Management">
                <div style={styles.loadingState}><Spinner /></div>
              </Card>
            }
          >
            <UserDashboardWidget />
          </React.Suspense>
        ) : (
          <div style={styles.emptyWidget}>
            <p>User Management Widget Hidden</p>
            <p style={styles.emptyHint}>Enable the checkbox above to load this MFE component</p>
          </div>
        )}

        {showTicketWidget ? (
          <React.Suspense
            fallback={
              <Card title="🎫 Ticketing System">
                <div style={styles.loadingState}><Spinner /></div>
              </Card>
            }
          >
            <TicketDashboardWidget />
          </React.Suspense>
        ) : (
          <div style={styles.emptyWidget}>
            <p>Ticketing Widget Hidden</p>
            <p style={styles.emptyHint}>Enable the checkbox above to load this MFE component</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MFEWrapper({ component: Component, name }: { component: React.ComponentType; name: string }) {
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // MFE loaded successfully if we got here
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}>Loading {name}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p>Failed to load {name}</p>
        <p style={styles.errorText}>{error.message}</p>
      </div>
    );
  }

  return <Component />;
}

function App() {
  return (
    <BrowserRouter>
      <div style={styles.appContainer}>
        <Navigation />
        <main style={styles.main}>
          <React.Suspense
            fallback={
              <div style={styles.loadingContainer}>
                <div style={styles.spinner}>Loading...</div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/users"
                element={
                  <MFEWrapper component={UserManagementApp} name="User Management" />
                }
              />
              <Route
                path="/tickets"
                element={
                  <MFEWrapper component={TicketingApp} name="Ticketing" />
                }
              />
            </Routes>
          </React.Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    backgroundColor: '#009999',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,153,153,0.3)',
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'all 0.2s',
  },
  logoWrapperActive: {
    background: 'rgba(255,255,255,0.2)',
  },
  logo: {
    fontSize: '24px',
    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  logoReveal: {
    animation: 'logoSpin 0.5s ease-out',
    filter: 'drop-shadow(0 0 10px #ffd700)',
  },
  brandText: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 600,
    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    display: 'inline-block',
  },
  brandTextReveal: {
    animation: 'textReveal 0.5s ease-out',
    color: '#ffd700',
    textShadow: '0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
  },
  navLinks: {
    display: 'flex',
    gap: '8px',
  },
  navLink: {
    padding: '8px 16px',
    color: '#ffffff',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  navLinkActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    color: '#ffffff',
  },
  main: {
    flex: 1,
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    backgroundColor: '#f8f9fa',
  },
  homeContainer: {
    marginTop: '24px',
  },
  homeText: {
    fontSize: '16px',
    color: '#4a4a4a',
    marginBottom: '24px',
  },
  toggleContainer: {
    display: 'flex',
    gap: '24px',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #e0e0e0',
  },
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#333333',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '20px',
  },
  statCard: {
    textAlign: 'center',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#009999',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#879baa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  widgetFooter: {
    paddingTop: '16px',
    borderTop: '1px solid #e0e0e0',
  },
  viewAllLink: {
    display: 'inline-block',
    color: '#009999',
    fontWeight: 500,
    textDecoration: 'none',
  },
  loadingState: {
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
  },
  errorState: {
    padding: '20px',
    color: '#E1281E',
    textAlign: 'center' as const,
  },
  emptyWidget: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '2px dashed #cccccc',
    minHeight: '250px',
  },
  emptyHint: {
    fontSize: '13px',
    color: '#879baa',
    marginTop: '8px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  spinner: {
    fontSize: '16px',
    color: '#009999',
  },
  errorContainer: {
    padding: '24px',
    textAlign: 'center',
    color: '#E1281E',
  },
  errorText: {
    fontSize: '14px',
    color: '#879baa',
    marginTop: '8px',
  },
};

export default App;
