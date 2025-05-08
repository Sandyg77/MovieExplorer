// src/components/MovieCard.jsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
} from "@mui/material";

const MovieCard = ({ movie, onClick }) => {
  return (
    <Card onClick={onClick} sx={{ cursor: "pointer", height: "100%" }}>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        sx={{ height: 300 }}
      />
      <CardContent>
        <Typography variant="h6" noWrap gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(movie.release_date).getFullYear()}
        </Typography>
        <Box mt={1}>
          <Rating
            name="read-only"
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
