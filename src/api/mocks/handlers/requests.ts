import { http, HttpResponse, delay } from 'msw';
import { MOCK_REQUESTS } from '../data/requests';
import type { Request } from '@/types/domain';
import { paginated, apiResponse } from '@/api/mocks/response';

export const requestsHandlers = [
  http.get('/api/requests', async ({ request }) => {
    const url = new URL(request.url);

    const errorScenario = url.searchParams.get('__error');
    if (errorScenario === '401') {
      return HttpResponse.json(apiResponse('Session expired', { status_code: 401, code: 'AUTH_EXPIRED', success: false }), { status: 401 });
    }
    if (errorScenario === '403') {
      return HttpResponse.json(apiResponse('Forbidden', { status_code: 403, code: 'FORBIDDEN', success: false }), { status: 403 });
    }
    if (errorScenario === '500') {
      return HttpResponse.json(apiResponse('Server error', { status_code: 500, code: 'SERVER_ERROR', success: false }), { status: 500 });
    }
    if (errorScenario === 'empty') {
      return HttpResponse.json(paginated([], 0, 1, 10));
    }

    await delay(400);

    const search = url.searchParams.get('search')?.toLowerCase();
    const status = url.searchParams.get('status');
    const priority = url.searchParams.get('priority');
    const page = Number(url.searchParams.get('page')) || 1;
    const perPage = Number(url.searchParams.get('pageSize')) || 10;

    let filtered = [...MOCK_REQUESTS];
    if (search) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(search) ||
          r.requestedBy.toLowerCase().includes(search) ||
          (r.assignee && r.assignee.toLowerCase().includes(search))
      );
    }
    if (status && status !== 'all') {
      filtered = filtered.filter((r) => r.status === status);
    }
    if (priority && priority !== 'all') {
      filtered = filtered.filter((r) => r.priority === priority);
    }

    return HttpResponse.json(paginated(filtered, filtered.length, page, perPage));
  }),

  http.get('/api/requests/:id', async ({ params }) => {
    await delay(300);
    const request_item = MOCK_REQUESTS.find((r) => r.id === params.id);
    if (!request_item) {
      return HttpResponse.json(apiResponse('Request not found', { status_code: 404, code: 'NOT_FOUND', success: false }), { status: 404 });
    }
    return HttpResponse.json(apiResponse('Success get request.', { data: request_item }));
  }),

  http.post('/api/requests', async ({ request }) => {
    await delay(600);
    const body = (await request.json()) as Partial<Request>;
    const newRequest: Request = {
      id: `req-${MOCK_REQUESTS.length + 1}`,
      title: body.title ?? '',
      status: body.status ?? 'pending',
      priority: body.priority ?? 'medium',
      requestedBy: body.requestedBy ?? '',
      assignee: body.assignee ?? null,
      createdAt: new Date().toISOString(),
    };
    MOCK_REQUESTS.push(newRequest);
    return HttpResponse.json(apiResponse('Success create data.', { status_code: 201, data: newRequest }), { status: 201 });
  }),

  http.put('/api/requests/:id', async ({ params, request }) => {
    await delay(500);
    const body = (await request.json()) as Partial<Request>;
    const index = MOCK_REQUESTS.findIndex((r) => r.id === params.id);
    if (index === -1) {
      return HttpResponse.json(apiResponse('Request not found', { status_code: 404, code: 'NOT_FOUND', success: false }), { status: 404 });
    }
    MOCK_REQUESTS[index] = { ...MOCK_REQUESTS[index], ...body };
    return HttpResponse.json(apiResponse('Success update data.', { data: MOCK_REQUESTS[index] }));
  }),

  http.delete('/api/requests/:id', async ({ params }) => {
    await delay(400);
    const index = MOCK_REQUESTS.findIndex((r) => r.id === params.id);
    if (index === -1) {
      return HttpResponse.json(apiResponse('Request not found', { status_code: 404, code: 'NOT_FOUND', success: false }), { status: 404 });
    }
    MOCK_REQUESTS.splice(index, 1);
    return HttpResponse.json(apiResponse('Success delete data.'));
  }),

  http.put('/api/requests/:id/status', async ({ params, request }) => {
    await delay(500);
    const body = (await request.json()) as { status: string };
    const index = MOCK_REQUESTS.findIndex((r) => r.id === params.id);
    if (index === -1) {
      return HttpResponse.json(apiResponse('Request not found', { status_code: 404, code: 'NOT_FOUND', success: false }), { status: 404 });
    }
    MOCK_REQUESTS[index] = { ...MOCK_REQUESTS[index], status: body.status as Request['status'] };
    return HttpResponse.json(apiResponse('Success update data.', { data: MOCK_REQUESTS[index] }));
  }),
];
