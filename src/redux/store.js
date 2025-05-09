// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./MovieSlice";

export const store = configureStore({
  reducer: {
    movies: MovieReducer,
  },
});
