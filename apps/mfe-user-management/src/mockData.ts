import type { User } from '@siemens-energy/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alexander Müller',
    email: 'alexander.mueller@siemens-energy.com',
    role: 'admin',
    department: 'Engineering',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sophie Schmidt',
    email: 'sophie.schmidt@siemens-energy.com',
    role: 'manager',
    department: 'Product Management',
    status: 'active',
  },
  {
    id: '3',
    name: 'Thomas Weber',
    email: 'thomas.weber@siemens-energy.com',
    role: 'user',
    department: 'Engineering',
    status: 'active',
  },
  {
    id: '4',
    name: 'Maria Fischer',
    email: 'maria.fischer@siemens-energy.com',
    role: 'user',
    department: 'Quality Assurance',
    status: 'active',
  },
  {
    id: '5',
    name: 'Michael Becker',
    email: 'michael.becker@siemens-energy.com',
    role: 'manager',
    department: 'Operations',
    status: 'inactive',
  },
  {
    id: '6',
    name: 'Julia Hoffmann',
    email: 'julia.hoffmann@siemens-energy.com',
    role: 'user',
    department: 'Engineering',
    status: 'active',
  },
];

export function getUsers(): User[] {
  return mockUsers;
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
}
