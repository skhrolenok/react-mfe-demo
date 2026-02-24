'use client';

import { Card, Badge } from '@siemens-energy/ui-kit';
import { mockTickets } from './mockData.ts';
import './TicketDashboardWidget.css';

export function TicketDashboardWidget() {
  const highPriority = mockTickets.filter((t) => t.priority === 'high');
  const inProgress = mockTickets.filter((t) => t.status === 'in-progress');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <Card title="🎫 Ticketing System">
      <div className="dashboard-widget">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{mockTickets.length}</div>
            <div className="stat-label">Total Tickets</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{inProgress.length}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{highPriority.length}</div>
            <div className="stat-label">High Priority</div>
          </div>
        </div>

        <div className="ticket-list-preview">
          <h4>Recent Tickets</h4>
          {mockTickets.slice(0, 3).map((ticket) => (
            <div key={ticket.id} className="ticket-item">
              <div className="ticket-info">
                <span className="ticket-id">{ticket.id}</span>
                <span className="ticket-title">{ticket.title}</span>
              </div>
              <div className="ticket-badges">
                <Badge color={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="widget-footer">
          <a href="/tickets" className="view-all-link">
            View All Tickets →
          </a>
        </div>
      </div>
    </Card>
  );
}
