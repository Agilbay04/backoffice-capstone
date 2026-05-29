import type { IUser } from '@/types/domain';

export const MOCK_USERS: IUser[] = [
  { 
    id: '1', 
    name: 'Mama Ghufron', 
    email: 'admin@example.com', 
    role: 'admin', 
    status: 'active', 
    createdAt: '2026-05-15', 
    password: 'password123' 
  },
  { 
    id: '2', 
    name: 'Manager Ghufron 1', 
    email: 'mng.ghufron1@example.com', 
    role: 'manager', 
    status: 'inactive', 
    createdAt: '2026-05-16', 
    password: 'password123' 
  },
  { 
    id: '3', 
    name: 'Manager Ghufron 2', 
    email: 'mng.ghufron4@example.com', 
    role: 'manager', 
    status: 'active', 
    createdAt: '2026-05-19', 
    password: 'password123' 
  },
  { 
    id: '4', 
    name: 'Operator Ghufron 1', 
    email: 'op.ghufron2@example.com', 
    role: 'operator', 
    status: 'inactive', 
    createdAt: '2026-05-17', 
    password: 'password123' 
  },
  { 
    id: '5', 
    name: 'Operator Ghufron 2', 
    email: 'op.ghufron3@example.com', 
    role: 'operator', 
    status: 'active', 
    createdAt: '2026-05-18', 
    password: 'password123' 
  },
  { 
    id: '6', 
    name: 'Admin Ghufron', 
    email: 'adm.ghufron4@example.com', 
    role: 'admin', 
    status: 'inactive', 
    createdAt: '2026-05-19', 
    password: 'password123'
  },
];