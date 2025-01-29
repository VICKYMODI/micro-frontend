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