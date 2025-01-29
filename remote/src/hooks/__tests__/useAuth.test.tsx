import { renderHook } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { vi } from 'vitest';

describe('useAuth', () => {
  const mockUser = {
    id: '1',
    username: 'testuser',
    role: 'admin' as const
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should initialize with null user', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue(null);
    
    const { result } = renderHook(() => useAuth());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAdmin).toBe(false);
  });
  it('should load user from localStorage', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(mockUser));
    
    const { result } = renderHook(() => useAuth());
    
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAdmin).toBe(true);
  });
  it('should handle invalid JSON in localStorage', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue('invalid-json');
    
    const { result } = renderHook(() => useAuth());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAdmin).toBe(false);
  });
}); 