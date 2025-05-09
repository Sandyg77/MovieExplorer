import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import MovieCard from "./MovieCard";
import axios from "axios";

const API_KEY = "8bb13066322ba409c70487becd37cc7c";
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

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
    const scrollAmount = 300;
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
    <Box sx={{ position: "relative", paddingY: 3 }}>
      {/* Arrows */}
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

      {/* Scrollable Movies Container */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          paddingBottom: 2,
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
              minWidth: { xs: "140px", sm: "160px", md: "180px" },
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
