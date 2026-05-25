import { http, HttpResponse, delay } from 'msw';
import { MOCK_USERS } from '../data/users';
import { omit } from '@/utils/utils';
import type { User } from '@/types/domain';
import { paginated, single, created, updated, deleted, errorResponse } from '@/api/mocks/response';

export const usersHandlers = [
  http.get('/api/users', async ({ request }) => {
    const url = new URL(request.url);

    const errorScenario = url.searchParams.get('__error');
    if (errorScenario === '401') {
      return HttpResponse.json(errorResponse(401, 'Session expired', 'AUTH_EXPIRED'), { status: 401 });
    }
    if (errorScenario === '403') {
      return HttpResponse.json(errorResponse(403, 'Insufficient permissions', 'FORBIDDEN'), { status: 403 });
    }
    if (errorScenario === '500') {
      return HttpResponse.json(errorResponse(500, 'Internal server error', 'SERVER_ERROR'), { status: 500 });
    }
    if (errorScenario === 'empty') {
      return HttpResponse.json(paginated([], 0, 1, 10));
    }

    await delay(400);

    const search = url.searchParams.get('search')?.toLowerCase();
    const role = url.searchParams.get('role');
    const status = url.searchParams.get('status');
    const page = Number(url.searchParams.get('page')) || 1;
    const perPage = Number(url.searchParams.get('pageSize')) || 10;

    let filtered = [...MOCK_USERS];

    if (search) {
      filtered = filtered.filter(
        (u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
      );
    }
    if (role && role !== 'all') {
      filtered = filtered.filter((u) => u.role === role);
    }
    if (status && status !== 'all') {
      filtered = filtered.filter((u) => u.status === status);
    }

    const safeUsers = filtered.map((user) => omit(user, 'password'));
    return HttpResponse.json(paginated(safeUsers, safeUsers.length, page, perPage));
  }),

  http.get('/api/users/:id', async ({ params }) => {
    await delay(300);
    const user = MOCK_USERS.find((u) => u.id === params.id);
    if (!user) {
      return HttpResponse.json(errorResponse(404, 'User not found', 'NOT_FOUND'), { status: 404 });
    }
    return HttpResponse.json(single(omit(user, 'password'), 'Success get user.'));
  }),

  http.post('/api/users', async ({ request }) => {
    await delay(600);
    const body = (await request.json()) as Partial<User>;
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      name: body.name ?? '',
      email: body.email ?? '',
      role: body.role ?? 'operator',
      status: body.status ?? 'active',
      password: 'password123',
      createdAt: new Date().toISOString().split('T')[0],
    };
    MOCK_USERS.push(newUser);
    return HttpResponse.json(created(omit(newUser, 'password')), { status: 201 });
  }),

  http.put('/api/users/:id', async ({ params, request }) => {
    await delay(500);
    const body = (await request.json()) as Partial<User>;
    const index = MOCK_USERS.findIndex((u) => u.id === params.id);
    if (index === -1) {
      return HttpResponse.json(errorResponse(404, 'User not found', 'NOT_FOUND'), { status: 404 });
    }
    MOCK_USERS[index] = { ...MOCK_USERS[index], ...body };
    return HttpResponse.json(updated(omit(MOCK_USERS[index], 'password')));
  }),

  http.delete('/api/users/:id', async ({ params }) => {
    await delay(400);
    const index = MOCK_USERS.findIndex((u) => u.id === params.id);
    if (index === -1) {
      return HttpResponse.json(errorResponse(404, 'User not found', 'NOT_FOUND'), { status: 404 });
    }
    MOCK_USERS.splice(index, 1);
    return HttpResponse.json(deleted());
  }),
];
