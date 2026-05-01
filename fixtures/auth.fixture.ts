import { test as base, request } from '@playwright/test';

type AuthFixtures = {
  token: string;
};
export const test = base.extend<AuthFixtures>({
  token: async ({}, use) => {
    const requestContext = await request.newContext();
    const apiResponse = await requestContext.post(
      'https://dummyjson.com/auth/login', {
        data: {
          username: 'emilys',
          password: 'emilyspass',
          expiresInMins: 30
        }
      }
    );
    const responseBody = await apiResponse.json();
    const token = responseBody.accessToken;
    console.log(token);
    if (!token) {
      throw new Error('Token not generated from login API');
    }
    await use(token);
  }
});
export { expect } from '@playwright/test'
