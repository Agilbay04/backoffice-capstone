import { http, HttpResponse, delay } from 'msw';
import { MOCK_USERS } from '@/api/mocks/data/users';
import { omit } from '@/utils/utils';
import { single, errorResponse } from '@/api/mocks/response';

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    await delay(800);

    const body = (await request.json()) as { email: string; password: string };
    const user = MOCK_USERS.find(
      (u) => u.email === body.email && u.password === body.password
    );

    if (!user) {
      return HttpResponse.json(
        errorResponse(401, 'Invalid email or password', 'AUTH_INVALID'),
        { status: 401 }
      );
    }

    return HttpResponse.json(single(omit(user, 'password'), 'Login successful.'));
  }),

  http.get('/api/auth/me', async () => {
    await delay(200);
    return HttpResponse.json(single(omit(MOCK_USERS[0], 'password'), 'Success get user.'));
  }),
];
