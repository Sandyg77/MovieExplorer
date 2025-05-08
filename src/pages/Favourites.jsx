// src/pages/Favorites.jsx
import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard"; // Import MovieCard component

const Favorites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Link to="/home">
        <Button variant="contained" sx={{ marginBottom: 2 }}>
          Back to Home
        </Button>
      </Link>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Your Favorite Movies
      </Typography>
      {favorites.length > 0 ? (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <MovieCard
                movie={movie}
                onClick={() => removeFromFavorites(movie.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="text.secondary">
          You have no favorite movies.
        </Typography>
      )}
    </Box>
  );
};

export default Favorites;
