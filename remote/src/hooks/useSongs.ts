import { useState, useEffect } from 'react';
import { Song, AddSongRequest } from '../types';

const API_URL = 'http://localhost:3001/api';

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

console.log(token)
  const fetchSongs = async () => {
    try {
      const response = await fetch(`${API_URL}/songs`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      setSongs(data);
    } catch (err) {
      setError('Failed to fetch songs');
    } finally {
      setLoading(false);
    }
  };

  const addSong = async (newSong: AddSongRequest) => {
    try {
      
      const response = await fetch(`${API_URL}/songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSong)
      });
      
      if (!response.ok) throw new Error('Failed to add song');
      
      const data = await response.json();
      setSongs([...songs, data]);
      return true;
    } catch (err) {
      setError('Failed to add song');
      return false;
    }
  };

  const deleteSong = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/songs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete song');
      }
      
      setSongs(songs.filter(song => song.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete song');
      return false;
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return { songs, loading, error, addSong, deleteSong };
};