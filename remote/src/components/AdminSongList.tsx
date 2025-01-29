import { useState } from "react";
import { Song, AddSongRequest } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSongs } from '../hooks/useSongs';

export const AdminSongList = () => {
  const { songs, loading, error, addSong, deleteSong } = useSongs();
  const [sortBy, setSortBy] = useState<keyof Song>("title");
  const [filterText, setFilterText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newSong, setNewSong] = useState<AddSongRequest>({
    title: '',
    artist: '',
    album: '',
    year: new Date().getFullYear(),
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredAndSortedSongs = songs
    .filter((song) =>
      Object.values(song).some((value) =>
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

  const handleSubmit = async () => {
    const success = await addSong(newSong);
    if (success) {
      setOpenDialog(false);
      setNewSong({
        title: '',
        artist: '',
        album: '',
        year: new Date().getFullYear(),
      });
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteSong(id);
    if (!success) {
      alert('Failed to delete song');
    }
  };

  return (
    <Box
      display="flex-center"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      minWidth="100vw"
      sx={{ backgroundColor: "#f5f5f5", padding: 3 }}
    >
      <Paper elevation={4} sx={{ maxWidth: 900, width: "100%", padding: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" color="primary">
            🎵 Music Library
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Add Song
          </Button>
        </Box>

        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={3}>
          <TextField
            label="Search Songs"
            variant="outlined"
            fullWidth
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as keyof Song)}>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="artist">Artist</MenuItem>
              <MenuItem value="album">Album</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#3f51b5" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Artist</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Album</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Year</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedSongs.length > 0 ? (
                filteredAndSortedSongs.map((song, index) => (
                  <TableRow
                    key={song.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f0f0f0" : "white",
                      "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                  >
                    <TableCell>{song.title}</TableCell>
                    <TableCell>{song.artist}</TableCell>
                    <TableCell>{song.album}</TableCell>
                    <TableCell>{song.year}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(song.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="gray">🚫 No songs found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Song</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} sx={{ minWidth: 400, mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={newSong.title}
              onChange={(e) => setNewSong({...newSong, title: e.target.value})}
            />
            <TextField
              label="Artist"
              fullWidth
              value={newSong.artist}
              onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
            />
            <TextField
              label="Album"
              fullWidth
              value={newSong.album}
              onChange={(e) => setNewSong({...newSong, album: e.target.value})}
            />
            <TextField
              label="Year"
              type="number"
              fullWidth
              value={newSong.year}
              onChange={(e) => setNewSong({...newSong, year: parseInt(e.target.value)})}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 