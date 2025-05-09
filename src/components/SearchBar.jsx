import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../redux/MovieSlice.js";

const API_KEY = "8bb13066322ba409c70487becd37cc7c";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const theme = useTheme();

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) return;
    if (searchTerm.length > 3) {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
        );

        if (res.data.results.length > 0) {
          dispatch(setMovies(res.data.results));
        }
      } catch (err) {
        // console.log("Failed to load movies. Please try again.");
      }
    } else {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${1}`
        );

        if (res.data.results.length > 0) {
          dispatch(setMovies(res.data.results));
        }
      } catch (err) {
        // console.log("Failed to load movies. Please try again.");
      }
    }
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        px: 2,
        py: 0.5,
        borderRadius: 2,
        minWidth: { xs: "100%", sm: 300 },
        maxWidth: 400,
      }}
    >
      <Search sx={{ mr: 1, color: theme.palette.text.secondary }} />
      <InputBase
        placeholder="I'm searching for..."
        fullWidth
        onChange={(e) => setQuery(e.target.value)}
        sx={{ color: theme.palette.text.primary }}
      />
    </Box>
  );
};

export default SearchBar;
