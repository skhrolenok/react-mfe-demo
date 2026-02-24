import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`} style={styles.card}>
      {title && <h3 style={styles.cardTitle}>{title}</h3>}
      <div style={styles.cardContent}>{children}</div>
    </div>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.button,
        ...(variant === 'primary' ? styles.buttonPrimary : {}),
        ...(variant === 'secondary' ? styles.buttonSecondary : {}),
        ...(variant === 'danger' ? styles.buttonDanger : {}),
        ...(disabled ? styles.buttonDisabled : {}),
      }}
    >
      {children}
    </button>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  color?: 'green' | 'yellow' | 'red' | 'blue' | 'gray';
}

export function Badge({ children, color = 'gray' }: BadgeProps) {
  return (
    <span
      className={`badge badge-${color}`}
      style={{
        ...styles.badge,
        ...(color === 'green' ? styles.badgeGreen : {}),
        ...(color === 'yellow' ? styles.badgeYellow : {}),
        ...(color === 'red' ? styles.badgeRed : {}),
        ...(color === 'blue' ? styles.badgeBlue : {}),
        ...(color === 'gray' ? styles.badgeGray : {}),
      }}
    >
      {children}
    </span>
  );
}

export function Spinner() {
  return (
    <div className="spinner" style={styles.spinner}>
      <div style={styles.spinnerCircle}></div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '16px',
    marginBottom: '16px',
  },
  cardTitle: {
    margin: '0 0 12px 0',
    fontSize: '18px',
    fontWeight: 600,
    color: '#1a1a1a',
  },
  cardContent: {
    color: '#4a4a4a',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'background-color 0.2s',
  },
  buttonPrimary: {
    backgroundColor: '#009999',
    color: '#ffffff',
  },
  buttonSecondary: {
    backgroundColor: '#f0f0f0',
    color: '#333333',
  },
  buttonDanger: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 500,
  },
  badgeGreen: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  badgeYellow: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  badgeRed: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  badgeBlue: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
  },
  badgeGray: {
    backgroundColor: '#e9ecef',
    color: '#495057',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerCircle: {
    width: '24px',
    height: '24px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #009999',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};
