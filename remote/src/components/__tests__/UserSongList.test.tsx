import { render, screen, fireEvent } from '@testing-library/react';
import { UserSongList } from '../UserSongList';
import { useSongs } from '../../hooks/useSongs';
import { vi } from 'vitest';

// Mock the useSongs hook
vi.mock('../../hooks/useSongs');

describe('UserSongList', () => {
  const mockSongs = [
    { id: '1', title: 'Song 1', artist: 'Artist 1', album: 'Album 1', year: 2021 },
    { id: '2', title: 'Song 2', artist: 'Artist 2', album: 'Album 2', year: 2022 },
  ];

  beforeEach(() => {
    (useSongs as jest.Mock).mockReturnValue({
      songs: mockSongs,
      loading: false,
      error: null,
    });
  });

  it('renders loading state', () => {
    (useSongs as jest.Mock).mockReturnValue({
      songs: [],
      loading: true,
      error: null,
    });

    render(<UserSongList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useSongs as jest.Mock).mockReturnValue({
      songs: [],
      loading: false,
      error: 'Test error',
    });

    render(<UserSongList />);
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });

  it('renders songs list', () => {
    render(<UserSongList />);
    expect(screen.getByText('Song 1')).toBeInTheDocument();
    expect(screen.getByText('Artist 2')).toBeInTheDocument();
  });

  it('filters songs by search text', () => {
    render(<UserSongList />);
    
    const searchInput = screen.getByLabelText('Search Songs');
    fireEvent.change(searchInput, { target: { value: 'Song 1' } });

    expect(screen.getByText('Song 1')).toBeInTheDocument();
    expect(screen.queryByText('Song 2')).not.toBeInTheDocument();
  });

  it('sorts songs by selected field', () => {
    render(<UserSongList />);
    
    const sortSelect = screen.getByLabelText('Sort By');
    fireEvent.change(sortSelect, { target: { value: 'year' } });

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('2021'); // First song
    expect(rows[2]).toHaveTextContent('2022'); // Second song
  });
}); 