import type { User } from '@siemens-energy/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Spark',
    email: 'alex@voltify.app',
    role: 'admin',
    department: 'Engineering',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sophie Volt',
    email: 'sophie@voltify.app',
    role: 'manager',
    department: 'Product Management',
    status: 'active',
  },
  {
    id: '3',
    name: 'Tom Current',
    email: 'tom@voltify.app',
    role: 'user',
    department: 'Engineering',
    status: 'active',
  },
  {
    id: '4',
    name: 'Maria Power',
    email: 'maria@voltify.app',
    role: 'user',
    department: 'Quality Assurance',
    status: 'active',
  },
  {
    id: '5',
    name: 'Mike Amp',
    email: 'mike@voltify.app',
    role: 'manager',
    department: 'Operations',
    status: 'inactive',
  },
  {
    id: '6',
    name: 'Julia Watt',
    email: 'julia@voltify.app',
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
