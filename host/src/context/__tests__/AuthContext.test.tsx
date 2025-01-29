import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { vi } from 'vitest';

describe('AuthContext', () => {
  const mockUser = {
    id: '1',
    username: 'testuser',
    role: 'admin' as const
  };

  const mockToken = 'test-token';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const TestComponent = () => {
    const { user, login, logout } = useAuth();
    return (
      <div>
        <div data-testid="user">{user ? JSON.stringify(user) : 'no user'}</div>
        <button onClick={() => login(mockToken, mockUser)}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };

  it('provides authentication context', () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByTestId('user')).toHaveTextContent('no user');

    act(() => {
      getByText('Login').click();
    });

    expect(getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
    expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));

    act(() => {
      getByText('Logout').click();
    });

    expect(getByTestId('user')).toHaveTextContent('no user');
    expect(localStorage.clear).toHaveBeenCalled();
  });
}); 