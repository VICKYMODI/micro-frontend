import { renderHook } from '@testing-library/react';
import { useLoginApi } from '../useLoginApi';
import { vi } from 'vitest';

describe('useLoginApi', () => {
  const mockCredentials = {
    username: 'testuser',
    password: 'password123'
  };

  const mockResponse = {
    token: 'test-token',
    user: {
      id: '1',
      username: 'testuser',
      role: 'admin' as const
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should login successfully', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const { result } = renderHook(() => useLoginApi());
    const response = await result.current.loginUser(mockCredentials);

    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/login',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockCredentials)
      })
    );
  });

  it('should handle login failure', async () => {
    const errorMessage = 'Invalid credentials';
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: errorMessage })
    });

    const { result } = renderHook(() => useLoginApi());

    await expect(result.current.loginUser(mockCredentials)).rejects.toThrow(errorMessage);
  });
}); 