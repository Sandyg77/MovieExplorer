import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const MovieCard = ({ movie, onFavoriteChange }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if movie is in favorites when component mounts
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  // Handle clicking the card (navigate to movie details)
  const handleCardClick = (e) => {
    // Only navigate if the favorite button wasn't clicked
    if (!e.defaultPrevented) {
      navigate(`/movie/${movie.id}`);
    }
  };

  // Toggle favorite status
  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent card click event from firing

    // Get current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let updatedFavorites;
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, movie];
    }

    // Update localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Update state
    setIsFavorite(!isFavorite);

    // Notify parent component about the change (if callback exists)
    if (onFavoriteChange) {
      onFavoriteChange();
    }
  };

  return (
    <Card
      onClick={handleCardClick}
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
      {/* Favorite button - positioned absolutely on top of the card */}
      <Tooltip
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <IconButton
          onClick={toggleFavorite}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ color: "#ff1744" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "white" }} />
          )}
        </IconButton>
      </Tooltip>

      <CardContent>
        <Typography variant="h6" noWrap gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "N/A"}
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
