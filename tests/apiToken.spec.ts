import { test, expect} from '../fixtures/auth.fixture';
import { request } from '@playwright/test';

test('API - get user profile using auth fixture token', async ({ token }:{ token: string }) => {
  const requestContext = await request.newContext();

  const res = await requestContext.get(
    'https://dummyjson.com/auth/me',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  expect(res.ok()).toBeTruthy();

  const user = await res.json();
  console.log(user);
});

