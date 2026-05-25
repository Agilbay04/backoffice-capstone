import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth';
import { usersHandlers } from './handlers/users';
import { requestsHandlers } from './handlers/requests';
import { auditLogsHandlers } from './handlers/audit-logs';

export const worker = setupWorker(
  ...authHandlers,
  ...usersHandlers,
  ...requestsHandlers,
  ...auditLogsHandlers,
);