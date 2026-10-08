import { APIRequestContext, expect } from '@playwright/test';

export type UserPayload = {
  username: string;
  email: string;
  password: string;
  roles?: string[];
};

export type CreatedUser = UserPayload & { id: number };

export async function createUserViaApi(
  request: APIRequestContext,
  userData: UserPayload,
): Promise<CreatedUser> {
  const response = await request.post('/wp-json/wp/v2/users', { data: userData });
  await expect(response).toBeOK();
  return response.json();
}

export async function deleteUserViaApi(request: APIRequestContext, userId: number): Promise<void> {
  const response = await request.delete(`/wp-json/wp/v2/users/${userId}`, {
    data: { force: true, reassign: 1 },
  });
  await expect(response).toBeOK();
}

export async function createPostViaApi(
  request: APIRequestContext,
  title: string,
  content: string,
): Promise<{ id: number }> {
  const response = await request.post('/wp-json/wp/v2/posts', {
    data: { title, content, status: 'publish' },
  });
  await expect(response).toBeOK();
  return response.json();
}

export async function deletePostViaApi(request: APIRequestContext, postId: number): Promise<void> {
  const response = await request.delete(`/wp-json/wp/v2/posts/${postId}`, {
    data: { force: true },
  });
  await expect(response).toBeOK();
}
