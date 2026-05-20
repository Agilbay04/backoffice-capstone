import type { User } from '@/types/domain';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Mama Ghufron', email: 'ghufron@example.com', role: 'admin', status: 'active', createdAt: '2026-05-15' },
  { id: '2', name: 'Manager Ghufron 1', email: 'mng.ghufron1@example.com', role: 'manager', status: 'inactive', createdAt: '2026-05-16' },
  { id: '3', name: 'Manager Ghufron 2', email: 'mng.ghufron4@example.com', role: 'manager', status: 'active', createdAt: '2026-05-19' },
  { id: '4', name: 'Operator Ghufron 1', email: 'op.ghufron2@example.com', role: 'operator', status: 'inactive', createdAt: '2026-05-17' },
  { id: '5', name: 'Operator Ghufron 2', email: 'op.ghufron3@example.com', role: 'operator', status: 'active', createdAt: '2026-05-18' },
  { id: '6', name: 'Admin Ghufron', email: 'adm.ghufron4@example.com', role: 'admin', status: 'inactive', createdAt: '2026-05-19' }
];