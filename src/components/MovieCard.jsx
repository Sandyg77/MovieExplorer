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

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  const handleCardClick = (e) => {
    if (!e.defaultPrevented) {
      navigate(`/movie/${movie.id}`);
    }
  };

  const toggleFavorite = (e) => {
    e.preventDefault();

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);

    if (onFavoriteChange) {
      onFavoriteChange();
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: "pointer",
        width: { xs: 150, sm: 180, md: 220 },
        height: { xs: 340, sm: 380, md: 410 },
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
        image={
          movie.poster_path != null
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "./../../public/placeholder.png"
        }
        alt={movie.title}
        sx={{
          height: { xs: 220, sm: 250, md: 300 },
          objectFit: "cover",
        }}
      />

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

      <CardContent sx={{ paddingBottom: "12px !important" }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          noWrap
          title={movie.title}
        >
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "N/A"}
        </Typography>
        <Box mt={0.5}>
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
