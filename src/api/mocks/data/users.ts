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
  { 
    id: '7', 
    name: 'Operator 3', 
    email: 'operator3@example.com', 
    role: 'operator', 
    status: 'active', 
    createdAt: '2026-05-20', 
    password: 'password123' 
  },
  {
    id: '8',
    name: 'Manager 3',
    email: 'manager3@example.com',
    role: 'manager',
    status: 'active',
    createdAt: '2026-05-21',
    password: 'password123'
  },
  {
    id: '9',
    name: 'Operator 4',
    email: 'operator4@example.com',
    role: 'operator',
    status: 'active',
    createdAt: '2026-05-22',
    password: 'password123'
  },
  {
    id: '10',
    name: 'Operator 5',
    email: 'operator5@example.com',
    role: 'operator',
    status: 'active',
    createdAt: '2026-05-23',
    password: 'password123'
  },
  {
    id: '11',
    name: 'Manager 4',
    email: 'manager4@example.com',
    role: 'manager',
    status: 'active',
    createdAt: '2026-05-24',
    password: 'password123'
  },
  {
    id: '12',
    name: 'Operator 6',
    email: 'operator6@example.com',
    role: 'operator',
    status: 'active',
    createdAt: '2026-05-25',
    password: 'password123'
  },
  {
    id: '13',
    name: 'Manager 5',
    email: 'manager5@example.com',
    role: 'manager',
    status: 'active',
    createdAt: '2026-05-26',
    password: 'password123'
  },
];