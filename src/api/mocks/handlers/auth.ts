import { http, HttpResponse, delay } from 'msw';
import { MOCK_USERS } from '@/api/mocks/data/users';
import { omit } from '@/utils/utils';
import { apiResponse } from '@/api/mocks/response';

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    await delay(800);

    const body = (await request.json()) as { email: string; password: string };
    const user = MOCK_USERS.find(
      (u) => u.email === body.email && u.password === body.password
    );

    if (!user) {
      return HttpResponse.json(
        apiResponse('Invalid email or password', { status_code: 401, code: 'AUTH_INVALID', success: false }),
        { status: 401 }
      );
    }

    return HttpResponse.json(apiResponse('Login successful.', { data: omit(user, 'password') }));
  }),

  http.get('/api/auth/me', async () => {
    await delay(200);
    return HttpResponse.json(apiResponse('Success get user.', { data: omit(MOCK_USERS[0], 'password') }));
  }),
];
