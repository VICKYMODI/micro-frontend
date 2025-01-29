import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from '../Login';
import { useAuth } from '../../context/AuthContext';
import { useLoginApi } from '../../hooks/useLoginApi';
import { vi } from 'vitest';

// Mock the hooks
vi.mock('../../context/AuthContext');
vi.mock('../../hooks/useLoginApi');

describe('Login', () => {
  const mockLogin = vi.fn();
  const mockLoginUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
    (useLoginApi as jest.Mock).mockReturnValue({ loginUser: mockLoginUser });
  });

  it('renders login form', () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const mockResponse = {
      token: 'test-token',
      user: { id: '1', username: 'test', role: 'user' }
    };

    mockLoginUser.mockResolvedValueOnce(mockResponse);

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123'
      });
      expect(mockLogin).toHaveBeenCalledWith(mockResponse.token, mockResponse.user);
    });
  });

  it('handles login failure', async () => {
    const errorMessage = 'Invalid credentials';
    mockLoginUser.mockRejectedValueOnce(new Error(errorMessage));

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('validates required fields', async () => {
    render(<Login />);
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByLabelText(/username/i)).toBeInvalid();
    expect(screen.getByLabelText(/password/i)).toBeInvalid();
  });
}); 