import type { IRequest } from '@/types/domain';

export const MOCK_REQUESTS: IRequest[] = [
  {
    id: 'req-1',
    title: 'Upgrade Server Database',
    status: 'pending',
    priority: 'high',
    requestedBy: 'Super Admin',
    assignee: 'Manager 1',
    createdAt: '2026-05-19T08:00:00Z',
  },
  {
    id: 'req-2',
    title: 'Install Security Patch',
    status: 'approved',
    priority: 'critical',
    requestedBy: 'Operator 1',
    assignee: 'Admin',
    createdAt: '2026-05-18T10:30:00Z',
  },
  {
    id: 'req-3',
    title: 'Update User Permissions',
    status: 'rejected',
    priority: 'medium',
    requestedBy: 'Manager 2',
    assignee: null,
    createdAt: '2026-05-17T14:00:00Z',
  },
  {
    id: 'req-4',
    title: 'Deploy New Feature',
    status: 'pending',
    priority: 'low',
    requestedBy: 'Operator 2',
    assignee: null,
    createdAt: '2026-05-20T09:00:00Z',
  },
  {
    id: 'req-5',
    title: 'Database Migration',
    status: 'approved',
    priority: 'high',
    requestedBy: 'Admin',
    assignee: 'Super Admin',
    createdAt: '2026-05-16T11:00:00Z',
  },
];