import { test, expect } from '@playwright/test';
test('API Get Request', async ({ request }) => {
    const apiResponse = await request.get('https://jsonplaceholder.typicode.com/posts');
    const responseBody = await apiResponse.json();

    expect(apiResponse.status()).toBe(200);
    expect(apiResponse.statusText()).toBe('OK');

    const post = responseBody[3];

    expect(post.userId).toBe(1);
    expect(post.id).toBe(4);
    expect(post.title).toContain('eum et est occaecati');
    expect(post.body).toContain(`ullam et saepe reiciendis voluptatem adipisci
sit amet autem assumenda provident rerum culpa
quis hic commodi nesciunt rem tenetur doloremque ipsam iure
quis sunt voluptatem rerum illo velit`);
});


test('API Post request', async ({ request }) => {
    const apiResponse = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'foo',
            body: 'bar',
            userId: 1
        }
    });

    const responseBody = await apiResponse.json();

    expect(apiResponse.status()).toBe(201);
    expect(apiResponse.statusText()).toBe('Created');

    expect(responseBody.id).toBe(101);
    expect(responseBody.title).toBe('foo');
    expect(responseBody.body).toBe('bar');
    expect(responseBody.userId).toBe(1);
});

test('API Put request', async({request}) => {
const apiResponse=await request.put('https://jsonplaceholder.typicode.com/posts/1', 
{data: {id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,}
});

const responseBody=await apiResponse.json();
expect(apiResponse.status()).toBe(200);
expect(apiResponse.statusText()).toBe('OK');
expect(apiResponse.headers()['content-type']).toContain('application/json');
expect(responseBody.title).toBe('foo');
expect(responseBody.body).toBe('bar');
expect(responseBody.userId).toBe(1);

});


test('API Patch request', async ({ request }) => {
    const apiResponse = await request.patch('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
            title: 'foo',
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const responseBody = await apiResponse.json();

    expect(apiResponse.status()).toBe(200);
    expect(apiResponse.statusText()).toBe('OK');

    // Headers are accessed from apiResponse, not responseBody
    expect(apiResponse.headers()['content-type']).toContain('application/json');

    // Data assertions
    expect(responseBody.title).toBe('foo');
    expect(responseBody.userId).toBe(1);
    expect(responseBody.id).toBe(1);
});
test('API DELETE Request', async ({ request }) => {
    const apiResponse = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

    expect(apiResponse.status()).toBe(200);
    
    const responseBody = await apiResponse.json();
    expect(responseBody).toEqual({}); 
});
