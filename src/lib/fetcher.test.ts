import { getSession, signOut } from 'next-auth/react';

import APIClient from './fetcher';

jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

const fetchMock = jest.fn();
const getSessionMock = jest.mocked(getSession);
const signOutMock = jest.mocked(signOut);

type MockResponseInit = {
  contentType?: string;
  status?: number;
};

function mockResponse(body: unknown, init: MockResponseInit = {}) {
  const status = init.status ?? 200;

  return {
    headers: {
      get: jest.fn((name: string) => {
        if (name.toLowerCase() !== 'content-type') {
          return null;
        }

        return init.contentType ?? 'application/json';
      }),
    },
    json: jest.fn().mockResolvedValue(body),
    ok: status >= 200 && status < 300,
    status,
    text: jest.fn().mockResolvedValue(String(body)),
  };
}

describe('APIClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = fetchMock;
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('sends public JSON requests without reading the session', async () => {
    fetchMock.mockResolvedValue(mockResponse({ token: 'abc' }));
    const client = new APIClient('https://backend.test', true);

    const result = await client.post('/auth/login', {
      email: 'user@example.com',
      password: 'secret',
    });

    expect(result).toEqual({ token: 'abc' });
    expect(getSessionMock).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith('https://backend.test/auth/login', {
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'secret',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  });

  it('adds bearer authorization to protected requests', async () => {
    getSessionMock.mockResolvedValue({ accessToken: 'access-token' });
    fetchMock.mockResolvedValue(mockResponse({ data: [] }));
    const client = new APIClient('https://backend.test', true);

    await client.get('/users/me');

    expect(fetchMock).toHaveBeenCalledWith('https://backend.test/users/me', {
      headers: {
        Authorization: 'Bearer access-token',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  });

  it('does not set content-type for form data requests', async () => {
    getSessionMock.mockResolvedValue({ accessToken: 'access-token' });
    fetchMock.mockResolvedValue(mockResponse({ success: true }));
    const client = new APIClient('https://backend.test', true);
    const formData = new FormData();

    formData.append('file', new Blob(['content']), 'file.txt');

    await client.postFormData('/upload/document', formData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://backend.test/upload/document',
      {
        body: formData,
        headers: {
          Authorization: 'Bearer access-token',
        },
        method: 'POST',
      }
    );
  });

  it('signs out and throws when session refresh failed', async () => {
    getSessionMock.mockResolvedValue({ error: 'RefreshAccessTokenError' });
    const client = new APIClient('https://backend.test', true);

    await expect(client.get('/users/me')).rejects.toThrow(
      'Authentication failed, please login again'
    );

    expect(signOutMock).toHaveBeenCalledWith({ callbackUrl: '/sign-in' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('throws the backend error message for failed responses', async () => {
    fetchMock.mockResolvedValue(
      mockResponse({ message: 'Invalid credentials' }, { status: 400 })
    );
    const client = new APIClient('https://backend.test', true);

    await expect(client.post('/auth/login', {})).rejects.toThrow(
      'Invalid credentials'
    );
  });
});
