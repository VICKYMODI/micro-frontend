import { useState, useMemo } from "react";
import { Song } from "../types";
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
} from "@mui/material";
import { useSongs } from '../hooks/useSongs';

export const UserSongList = () => {
  const [sortBy, setSortBy] = useState<keyof Song>("title");
  const [filterText, setFilterText] = useState("");
  const { songs, loading, error } = useSongs();

  const filteredAndSortedSongs = useMemo(() => {
    if (!songs) return [];
    return songs
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
  }, [songs, sortBy, filterText]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  console.log("songs", songs);

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
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          🎵 Music Library
        </Typography>

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
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography color="gray">🚫 No songs found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}; 