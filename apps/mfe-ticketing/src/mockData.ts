import type { Ticket } from '@siemens-energy/types';

export const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'Migrate legacy authentication system',
    description: 'Update the authentication flow to use OAuth 2.0 and OpenID Connect standards for improved security.',
    status: 'in-progress',
    priority: 'high',
    assigneeId: '1',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: 'TKT-002',
    title: 'Implement real-time dashboard updates',
    description: 'Add WebSocket support for live updates on the monitoring dashboard without page refresh.',
    status: 'in-progress',
    priority: 'medium',
    assigneeId: '3',
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-21T10:15:00Z',
  },
  {
    id: 'TKT-003',
    title: 'Fix data export functionality',
    description: 'Resolve issues with CSV export generating incorrect character encoding for special characters.',
    status: 'in-progress',
    priority: 'low',
    assigneeId: '4',
    createdAt: '2024-01-19T08:30:00Z',
    updatedAt: '2024-01-21T16:45:00Z',
  },
  {
    id: 'TKT-004',
    title: 'Optimize database queries for reports',
    description: 'Improve performance of monthly report generation by optimizing SQL queries and adding indexes.',
    status: 'in-progress',
    priority: 'high',
    assigneeId: '6',
    createdAt: '2024-01-20T13:00:00Z',
    updatedAt: '2024-01-22T09:00:00Z',
  },
  {
    id: 'TKT-005',
    title: 'Add multi-language support',
    description: 'Implement i18n framework to support German, English, and Spanish languages across the portal.',
    status: 'in-progress',
    priority: 'medium',
    assigneeId: '2',
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
  },
  {
    id: 'TKT-006',
    title: 'Security audit and penetration testing',
    description: 'Conduct comprehensive security audit and fix identified vulnerabilities before production release.',
    status: 'in-progress',
    priority: 'high',
    assigneeId: '1',
    createdAt: '2024-01-22T09:00:00Z',
    updatedAt: '2024-01-23T15:00:00Z',
  },
];

export function getTickets(): Ticket[] {
  return mockTickets;
}

export function getTicketById(id: string): Ticket | undefined {
  return mockTickets.find((ticket) => ticket.id === id);
}

export function getTicketsByAssignee(assigneeId: string): Ticket[] {
  return mockTickets.filter((ticket) => ticket.assigneeId === assigneeId);
}
