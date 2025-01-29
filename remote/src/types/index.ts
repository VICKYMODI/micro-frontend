export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    year: number;
  }

export interface AddSongRequest {
  title: string;
  artist: string;
  album: string;
  year: number;
}