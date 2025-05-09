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
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{
        cursor: "pointer",
        width: 220,
        height: 410,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        sx={{ height: 300, objectFit: "cover" }}
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
