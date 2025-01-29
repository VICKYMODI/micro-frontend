import { renderHook, act } from '@testing-library/react';
import { useSongs } from '../useSongs';
import { vi } from 'vitest';

describe('useSongs', () => {
  const mockSongs = [
    { id: '1', title: 'Song 1', artist: 'Artist 1', album: 'Album 1', year: 2021 },
    { id: '2', title: 'Song 2', artist: 'Artist 2', album: 'Album 2', year: 2022 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(localStorage, 'getItem').mockReturnValue('mock-token');
  });

  it('should fetch songs successfully', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSongs),
    });

    const { result } = renderHook(() => useSongs());

    expect(result.current.loading).toBe(true);
    expect(result.current.songs).toEqual([]);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.songs).toEqual(mockSongs);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => useSongs());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch songs');
  });

  it('should add song successfully', async () => {
    const newSong = { title: 'New Song', artist: 'New Artist', album: 'New Album', year: 2023 };
    const returnedSong = { ...newSong, id: '3' };

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(returnedSong),
    });

    const { result } = renderHook(() => useSongs());

    let success;
    await act(async () => {
      success = await result.current.addSong(newSong);
    });

    expect(success).toBe(true);
    expect(result.current.songs).toContainEqual(returnedSong);
  });

  it('should delete song successfully', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Deleted' }),
    });

    const { result } = renderHook(() => useSongs());
    result.current.songs = mockSongs;

    let success;
    await act(async () => {
      success = await result.current.deleteSong('1');
    });

    expect(success).toBe(true);
    expect(result.current.songs).not.toContainEqual(mockSongs[0]);
  });
}); 