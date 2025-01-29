import express, { Request, Response } from 'express';
import cors from 'cors';
import { songs, users } from './data/song';
import { authenticateToken, generateToken } from './middleware/auth';

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Types
interface LoginRequest {
  username: string;
  password: string;
}

// Authentication endpoint
app.post(
  '/api/login',
  (req: Request<{}, {}, LoginRequest>, res: Response): void => {
    const { username, password } = req.body;
    const user :any= users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const token = generateToken(user);
    res.json({
      token, 
      user: { 
        id: user.id,
        username: user.username, 
        role: user.role 
      } 
    });
  }
);
// Songs endpoints
app.get(
  '/api/songs',
  authenticateToken as express.RequestHandler,
  (req: Request, res: Response): void => {
    res.json(songs);
  }
);

app.post(
  '/api/songs',
  authenticateToken as express.RequestHandler,
  (req: Request, res: Response): void => {
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ message: 'Unauthorized' });
    }

    const newSong = { 
      ...req.body, 
      id: (songs.length + 1).toString() 
    };
    songs.push(newSong);
    res.status(201).json(newSong);
  }
);

app.delete('/api/songs/:id',
  authenticateToken as express.RequestHandler,
  (req: Request, res: Response): void => {
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const index = songs.findIndex((song) => song.id === id);
    
    if (index === -1) {
      res.status(404).json({ message: 'Song not found' });
      return;
    }

    songs.splice(index, 1);
    res.status(200).json({ message: 'Song deleted successfully' });
  }
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// server/src/types/index.ts
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
}

// Augment express Request type
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      username: string;
      role: 'admin' | 'user';
    };
  }
}