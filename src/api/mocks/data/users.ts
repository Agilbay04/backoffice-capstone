import type { IUser } from '@/types/domain';

export const MOCK_USERS: IUser[] = [
  { 
    id: '1', 
    name: 'Super Admin', 
    email: 'admin@example.com', 
    role: 'admin', 
    status: 'active', 
    createdAt: '2026-05-15', 
    password: 'password123' 
  },
  { 
    id: '2', 
    name: 'Manager 1', 
    email: 'manager1@example.com', 
    role: 'manager', 
    status: 'inactive', 
    createdAt: '2026-05-16', 
    password: 'password123' 
  },
  { 
    id: '3', 
    name: 'Manager 2', 
    email: 'manager2@example.com', 
    role: 'manager', 
    status: 'active', 
    createdAt: '2026-05-19', 
    password: 'password123' 
  },
  { 
    id: '4', 
    name: 'Operator 1', 
    email: 'operator1@example.com', 
    role: 'operator', 
    status: 'inactive', 
    createdAt: '2026-05-17', 
    password: 'password123' 
  },
  { 
    id: '5', 
    name: 'Operator 2', 
    email: 'operator2@example.com', 
    role: 'operator', 
    status: 'active', 
    createdAt: '2026-05-18', 
    password: 'password123' 
  },
  { 
    id: '6', 
    name: 'Admin', 
    email: 'admin2@example.com', 
    role: 'admin', 
    status: 'inactive', 
    createdAt: '2026-05-19', 
    password: 'password123'
  },
];