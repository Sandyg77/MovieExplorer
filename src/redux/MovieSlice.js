// src/redux/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: JSON.parse(localStorage.getItem("movies")) || [],
  hasMore: false,
};

const MovieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = [...action.payload];
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    addMovies: (state, action) => {
      state.movies = [...state.movies, ...action.payload];
    },
  },
});

export const { setMovies, setHasMore, addMovies } = MovieSlice.actions;
export default MovieSlice.reducer;
