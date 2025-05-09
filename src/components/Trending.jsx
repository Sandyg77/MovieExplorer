import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import MovieCard from "./MovieCard";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(TRENDING_URL);
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const scroll = (direction) => {
    const scrollAmount = isMobile ? 200 : 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", py: { xs: 2, sm: 3, md: 4 } }}>
      {/* Arrows (hidden on extra-small screens) */}
      {!isMobile && (
        <>
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              zIndex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
          >
            <ArrowBackIos />
          </IconButton>

          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              zIndex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </>
      )}

      {/* Scrollable Container */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: { xs: 1.5, sm: 2 },
          px: { xs: 1, sm: 2 },
          pb: 2,
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        }}
      >
        {trendingMovies.map((movie) => (
          <Box
            key={movie.id}
            sx={{
              minWidth: { xs: "130px", sm: "150px", md: "180px" },
              flexShrink: 0,
            }}
          >
            <MovieCard movie={movie} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Trending;
