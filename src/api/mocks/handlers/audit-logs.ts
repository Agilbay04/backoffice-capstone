import { http, HttpResponse, delay } from 'msw';
import { MOCK_AUDIT_LOGS } from '../data/audit-logs';
import { paginated, single, errorResponse } from '@/api/mocks/response';

export const auditLogsHandlers = [
  http.get('/api/audit-logs', async ({ request }) => {
    const url = new URL(request.url);

    const errorScenario = url.searchParams.get('__error');
    if (errorScenario === '401') {
      return HttpResponse.json(errorResponse(401, 'Session expired', 'AUTH_EXPIRED'), { status: 401 });
    }
    if (errorScenario === '403') {
      return HttpResponse.json(errorResponse(403, 'Forbidden', 'FORBIDDEN'), { status: 403 });
    }
    if (errorScenario === '500') {
      return HttpResponse.json(errorResponse(500, 'Server error', 'SERVER_ERROR'), { status: 500 });
    }
    if (errorScenario === 'empty') {
      return HttpResponse.json(paginated([], 0, 1, 10));
    }

    await delay(400);

    const search = url.searchParams.get('search')?.toLowerCase();
    const page = Number(url.searchParams.get('page')) || 1;
    const perPage = Number(url.searchParams.get('pageSize')) || 20;

    let filtered = [...MOCK_AUDIT_LOGS];
    if (search) {
      filtered = filtered.filter(
        (l) => l.actor.toLowerCase().includes(search) || l.action.toLowerCase().includes(search)
      );
    }

    return HttpResponse.json(paginated(filtered, filtered.length, page, perPage));
  }),

  http.get('/api/audit-logs/:id', async ({ params }) => {
    await delay(300);
    const log = MOCK_AUDIT_LOGS.find((l) => l.id === params.id);
    if (!log) {
      return HttpResponse.json(errorResponse(404, 'Audit log not found', 'NOT_FOUND'), { status: 404 });
    }
    return HttpResponse.json(single(log, 'Success get audit log.'));
  }),
];
