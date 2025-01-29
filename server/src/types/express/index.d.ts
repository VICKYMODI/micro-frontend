import { User } from '../index';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        role: 'admin' | 'user';
      }
    }
  }
}