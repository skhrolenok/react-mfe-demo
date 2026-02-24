import React, { useState, useEffect } from 'react';
import { Card, Badge, Button } from '@siemens-energy/ui-kit';
import type { Ticket } from '@siemens-energy/types';
import { getTickets } from './mockData.ts';
import './index.css';

function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setTickets(getTickets());
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === 'all') return true;
    return ticket.priority === filter;
  });

  const getPriorityBadgeColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'blue';
    }
  };

  const getStatusBadgeColor = (status: Ticket['status']) => {
    switch (status) {
      case 'in-progress':
        return 'blue';
      case 'pending':
        return 'yellow';
      case 'completed':
        return 'green';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">Loading tickets...</div>
      </div>
    );
  }

  return (
    <div className="ticketing">
      <Card title="Tickets In Progress">
        <div className="filter-bar">
          <span className="filter-label">Priority:</span>
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'high' ? 'active' : ''}`}
            onClick={() => setFilter('high')}
          >
            High
          </button>
          <button
            className={`filter-btn ${filter === 'medium' ? 'active' : ''}`}
            onClick={() => setFilter('medium')}
          >
            Medium
          </button>
          <button
            className={`filter-btn ${filter === 'low' ? 'active' : ''}`}
            onClick={() => setFilter('low')}
          >
            Low
          </button>
        </div>

        <div className="tickets-table-container">
          <table className="tickets-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="ticket-id">{ticket.id}</td>
                  <td>
                    <div className="ticket-title-cell">
                      <span className="ticket-title">{ticket.title}</span>
                      <span className="ticket-description">{ticket.description}</span>
                    </div>
                  </td>
                  <td>
                    <Badge color={getPriorityBadgeColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </td>
                  <td>
                    <Badge color={getStatusBadgeColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </td>
                  <td className="ticket-date">{formatDate(ticket.createdAt)}</td>
                  <td>
                    <div className="ticket-actions">
                      <Button variant="primary">View</Button>
                      <Button variant="secondary">Edit</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tickets-summary">
          <p>
            Showing {filteredTickets.length} of {tickets.length} tickets
          </p>
        </div>
      </Card>
    </div>
  );
}

export function App() {
  return <TicketList />;
}

export default App;
