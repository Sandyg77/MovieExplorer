import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  useTheme,
  alpha,
  Fade,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import { styled } from "@mui/material/styles";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useNavigate } from "react-router-dom";

// Styled header with glass effect
const GlassHeader = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  borderRadius: 16,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  border: `1px solid ${alpha(
    theme.palette.mode === "dark" ? "#ffffff" : "#000000",
    0.1
  )}`,
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 8px 32px ${alpha("#000000", 0.3)}`
      : `0 8px 32px ${alpha("#1e88e5", 0.1)}`,
}));

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  const handleClearAll = () => {
    localStorage.setItem("favorites", JSON.stringify([]));
    setFavorites([]);
  };

  const handleFavoriteChange = () => {
    const updatedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(updatedFavorites);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #004d66,rgb(0, 21, 21))",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Fade in={isLoaded} timeout={800}>
          <Box>
            <GlassHeader>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(to right, #004d66 0%, #004d66)"
                        : "linear-gradient(to right, #004d66, #004d66)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  My Favorite Movies
                </Typography>
                {favorites.length > 0 && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteSweepIcon />}
                    onClick={handleClearAll}
                  >
                    Clear All
                  </Button>
                )}
              </Box>
              <Typography variant="subtitle1" color="text.primary">
                {favorites.length > 0
                  ? `You have ${favorites.length} favorite movie${
                      favorites.length !== 1 ? "s" : ""
                    }`
                  : "You haven't added any favorites yet"}
              </Typography>
            </GlassHeader>

            {favorites.length > 0 ? (
              <Grid container spacing={3} justifyContent="center">
                {favorites.map((movie) => (
                  <Grid item key={movie.id}>
                    <MovieCard
                      movie={movie}
                      onFavoriteChange={handleFavoriteChange}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "50vh",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" color="white" gutterBottom>
                  Your favorites list is empty
                </Typography>
                <Typography variant="body1" color="white" sx={{ mb: 3 }}>
                  Click the heart icon on any movie card to add it to your
                  favorites
                </Typography>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => navigate("/home")}
                >
                  Browse Movies
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Favorites;
