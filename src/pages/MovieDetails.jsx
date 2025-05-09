import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Rating,
  Chip,
  Grid,
  CircularProgress,
  IconButton,
  Container,
  useMediaQuery,
  Fade,
  Grow,
  Slide,
  ThemeProvider,
  createTheme,
  alpha,
  CssBaseline,
  useTheme,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MovieIcon from "@mui/icons-material/Movie";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// Define theme configurations
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1e88e5" },
    secondary: { main: "#00acc1" },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#121212",
      secondary: "#555555",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          background:
            "linear-gradient(135deg, rgb(0, 207, 207) 0%, #ffffff 100%)",
          color: "#004d66",
          "&:hover": {
            background:
              "linear-gradient(135deg, rgb(0, 207, 207) 20%, #ffffff 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 5px 15px rgba(0, 77, 102, 0.3)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00e5ff" },
    secondary: { main: "#004d66" },
    background: {
      default: "#121212",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          background: "linear-gradient(135deg, #00e5ff 0%, #004d66 100%)",
          color: "#ffffff",
          "&:hover": {
            background: "linear-gradient(135deg, #00e5ff 20%, #004d66 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 5px 15px rgba(0, 229, 255, 0.3)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

// Styled components with enhanced visuals
const GlassBox = styled(Box)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.paper, 0.8)
      : alpha(theme.palette.background.paper, 0.9),
  backdropFilter: "blur(10px)",
  borderRadius: 24,
  padding: theme.spacing(4),
  border: `1px solid ${alpha(
    theme.palette.mode === "dark" ? "#ffffff" : "#000000",
    0.1
  )}`,
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 8px 32px ${alpha("#000000", 0.5)}`
      : `0 8px 32px ${alpha("#1e88e5", 0.15)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? `0 12px 28px ${alpha("#00e5ff", 0.25)}`
        : `0 12px 28px ${alpha("#1e88e5", 0.25)}`,
  },
}));

const MoviePoster = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 12px 24px ${alpha("#000000", 0.7)}`
      : `0 12px 24px ${alpha("#000000", 0.3)}`,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Apply theme based on mode
  const appliedTheme = darkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(res.data);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const youtubeTrailer = res.data.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        setTrailer(youtubeTrailer?.key);
      } catch (error) {
        console.error("Failed to fetch trailer", error);
      }
    };

    fetchMovieDetails();
    fetchTrailer();

    // Set loaded state after a short delay for animations
    setTimeout(() => setIsLoaded(true), 300);
  }, [id]);

  if (!movie) {
    return (
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "background.default",
            backgroundImage:
              appliedTheme.palette.mode === "dark"
                ? "linear-gradient(to right, #141e30, #004d66)"
                : "linear-gradient(to right, rgb(0, 207, 207), #ffffff)",
          }}
        >
          <CircularProgress color="primary" size={60} />
        </Box>
      </ThemeProvider>
    );
  }

  // Format movie details
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "Unknown";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatMoney = (amount) => {
    if (!amount || amount === 0) return "Not available";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get backdrop URL for background image
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  // Get poster URL
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          transition: "background-color 0.5s ease",
          backgroundColor: "background.default",
          backgroundImage:
            appliedTheme.palette.mode === "dark"
              ? "linear-gradient(to right, #141e30, #004d66)"
              : "linear-gradient(to right, rgb(0, 207, 207), #ffffff)",
        }}
      >
        {/* Background Image with overlay */}
        {backdropUrl && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${backdropUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px)",
              opacity: appliedTheme.palette.mode === "dark" ? 0.2 : 0.1,
              zIndex: 0,
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  appliedTheme.palette.mode === "dark"
                    ? "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.98))"
                    : "linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(255,255,255,0.98))",
              },
            }}
          />
        )}

        {/* Content Container */}
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            py: 4,
          }}
        >
          {/* Theme Toggle */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                bgcolor: alpha(appliedTheme.palette.primary.main, 0.1),
                "&:hover": {
                  bgcolor: alpha(appliedTheme.palette.primary.main, 0.2),
                },
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>

          {/* Title Section */}
          <Fade in={isLoaded} timeout={800}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  background:
                    appliedTheme.palette.mode === "dark"
                      ? "linear-gradient(to right, #00e5ff, #1e88e5)"
                      : "linear-gradient(to right, #004d66, #1e88e5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                {movie.title}
              </Typography>
              {movie.tagline && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ fontStyle: "italic", mt: 1 }}
                >
                  "{movie.tagline}"
                </Typography>
              )}
            </Box>
          </Fade>

          {/* Movie Content */}
          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {/* Poster Section - Left Side */}
            <Grid item xs={12} md={4}>
              <Slide direction="right" in={isLoaded} timeout={1000}>
                <Box>
                  {posterUrl && (
                    <MoviePoster>
                      <img
                        src={posterUrl}
                        alt={movie.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    </MoviePoster>
                  )}

                  <GlassBox sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Movie Info
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <DateRangeIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        <strong>Release Date:</strong>{" "}
                        {formatDate(movie.release_date)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        <strong>Runtime:</strong> {formatRuntime(movie.runtime)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        <strong>Budget:</strong> {formatMoney(movie.budget)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        <strong>Revenue:</strong> {formatMoney(movie.revenue)}
                      </Typography>
                    </Box>
                  </GlassBox>
                </Box>
              </Slide>
            </Grid>

            {/* Movie Details Section - Right Side */}
            <Grid item xs={12} md={8}>
              <Slide direction="left" in={isLoaded} timeout={1200}>
                <GlassBox>
                  <Typography variant="h4" gutterBottom color="primary">
                    Overview
                  </Typography>

                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: "1.1rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {movie.overview}
                  </Typography>

                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    {/* Rating */}
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Rating
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Rating
                          value={movie.vote_average / 2}
                          precision={0.5}
                          readOnly
                          size="large"
                          sx={{ color: appliedTheme.palette.primary.main }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            ml: 2,
                            color: "text.secondary",
                            fontWeight: "bold",
                          }}
                        >
                          {movie.vote_average.toFixed(1)} / 10
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mt: 1 }}
                      >
                        Based on {movie.vote_count.toLocaleString()} votes
                      </Typography>
                    </Grid>

                    {/* Genres */}
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Genres
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {movie.genres.map((genre) => (
                          <Chip
                            key={genre.id}
                            label={genre.name}
                            sx={{
                              backgroundColor:
                                appliedTheme.palette.primary.main,
                              color: "#fff",
                              fontWeight: "bold",
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </GlassBox>
              </Slide>

              {/* Trailer Section */}
              {trailer && (
                <Grow in={isLoaded} timeout={1500}>
                  <GlassBox sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom color="primary">
                      <MovieIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                      Trailer
                    </Typography>
                    <Box
                      sx={{
                        position: "relative",
                        paddingTop: "56.25%",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow:
                          appliedTheme.palette.mode === "dark"
                            ? `0 10px 30px ${alpha("#000", 0.5)}`
                            : `0 10px 30px ${alpha("#1e88e5", 0.2)}`,
                      }}
                    >
                      <iframe
                        title="Movie Trailer"
                        src={`https://www.youtube.com/embed/${trailer}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                      />
                    </Box>
                  </GlassBox>
                </Grow>
              )}
            </Grid>
          </Grid>

          {/* Back Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Button
              variant="contained"
              component="a"
              href="/"
              color="primary"
              sx={{
                py: 1.5,
                px: 4,
              }}
            >
              Back to Movies
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MovieDetails;
