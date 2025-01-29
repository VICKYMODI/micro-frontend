import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');

    console.log(userStr)

    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const isAdmin = user?.role === 'admin';
  //const isAdmin = true;

  return { user, isAdmin };
}; 