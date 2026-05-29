import type { IMenu } from "@/types/domain";

export const NAV_ITEMS: IMenu[] = [
  { id: '1', url: '/dashboard', name: 'Dashboard', icon: 'layout-dashboard' },
  { id: '2', url: '/users', name: 'Users', icon: 'users' },
  { id: '3', url: '/requests', name: 'Requests', icon: 'file-text' },
  { id: '4', url: '/audit-logs', name: 'Audit Logs', icon: 'history' },
];
