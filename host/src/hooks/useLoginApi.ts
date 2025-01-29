interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: 'admin' | 'user';
  };
}

export const useLoginApi = () => {
  const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Invalid credentials');
    }

    return data;
  };

  return { loginUser };
}; 