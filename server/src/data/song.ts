import { Song, User } from '../types';

export const songs: Song[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    year: 1975,
  },
  {
    id: '2',
    title: 'Summers',
    artist: 'Cold Play',
    album: 'A Night at the Opera',
    year: 1985,
  },
  {
    id: '3',
    title: 'woka woka',
    artist: 'Shakira',
    album: 'World cup',
    year: 2000,
  },
  {
    id: '4',
    title: 'baby',
    artist: 'Justin bieber',
    album: 'baby',
    year: 1999,
  }

  // Add more songs...
];

export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123', // In real app, use hashed passwords
    role: 'admin',
  },
  {
    id: '2',
    username: 'user',
    password: 'user123',
    role: 'user',
  },
];
