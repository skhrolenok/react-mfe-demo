'use client';

import { Card, Badge } from '@siemens-energy/ui-kit';
import { mockUsers } from './mockData.ts';
import './DashboardWidget.css';

export function UserDashboardWidget() {
  const activeUsers = mockUsers.filter((u) => u.status === 'active');
  const adminUsers = mockUsers.filter((u) => u.role === 'admin');

  return (
    <Card title="👥 User Management">
      <div className="dashboard-widget">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{mockUsers.length}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{activeUsers.length}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{adminUsers.length}</div>
            <div className="stat-label">Admins</div>
          </div>
        </div>

        <div className="user-list-preview">
          <h4>Recent Users</h4>
          {mockUsers.slice(0, 3).map((user) => (
            <div key={user.id} className="user-item">
              <div className="user-avatar-small">
                {user.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-dept">{user.department}</span>
              </div>
              <Badge color={user.status === 'active' ? 'green' : 'gray'}>
                {user.status}
              </Badge>
            </div>
          ))}
        </div>

        <div className="widget-footer">
          <a href="/users" className="view-all-link">
            View All Users →
          </a>
        </div>
      </div>
    </Card>
  );
}
