export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  department: string;
  status: 'active' | 'inactive';
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'in-progress' | 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assigneeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
