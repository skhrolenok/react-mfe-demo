import React, { useState, useEffect } from 'react';
import { Card, Badge, Button } from '@siemens-energy/ui-kit';
import type { User } from '@siemens-energy/types';
import { getUsers } from './mockData.ts';
import './index.css';

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUsers(getUsers());
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter((user) => {
    if (filter === 'all') return true;
    return user.status === filter;
  });

  const getRoleBadgeColor = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'red';
      case 'manager':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getStatusBadgeColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'gray';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="user-management">
      <Card title="User Management">
        <div className="filter-bar">
          <span className="filter-label">Filter:</span>
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
            onClick={() => setFilter('inactive')}
          >
            Inactive
          </button>
        </div>

        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-header">
                <div className="user-avatar">
                  {user.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="user-info">
                  <h4 className="user-name">{user.name}</h4>
                  <p className="user-email">{user.email}</p>
                </div>
              </div>
              <div className="user-details">
                <div className="detail-row">
                  <span className="detail-label">Department:</span>
                  <span className="detail-value">{user.department}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Role:</span>
                  <Badge color={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <Badge color={getStatusBadgeColor(user.status)}>{user.status}</Badge>
                </div>
              </div>
              <div className="user-actions">
                <Button variant="primary">View</Button>
                <Button variant="secondary">Edit</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="users-summary">
          <p>
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
      </Card>
    </div>
  );
}

export function App() {
  return <UserList />;
}

export default App;
