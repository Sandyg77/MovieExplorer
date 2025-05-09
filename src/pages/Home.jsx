import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import Trending from "../components/Trending";
import { useDispatch, useSelector } from "react-redux";
import { setMovies, addMovies } from "../redux/MovieSlice.js";

// Use environment variable for the API key
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Home = () => {
  const dispatch = useDispatch();
  const selectedMovies = useSelector((state) => state.movies.movies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      );

      if (res.data.results.length > 0) {
        // setHasMore();
        if (page > 1) {
          dispatch(addMovies(res.data.results));
        } else {
          dispatch(setMovies(res.data.results));
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load movies. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Layout>
      <Banner />

      {/* Trending Movies Section */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          mb={3}
          sx={{
            background: "#057295",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          Trending Movies
        </Typography>
        <Trending />
      </Container>

      <Container maxWidth="xl" sx={{ mt: 4 }} id="all-movies">
        <Typography
          variant="h4"
          mb={3}
          sx={{
            background: "#057295",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          All Movies
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={3}>
          {selectedMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} onClick={() => {}} />
            </Grid>
          ))}
        </Grid>
        {hasMore}
        <Box textAlign="center" mt={4}>
          {loading ? (
            <CircularProgress />
          ) : hasMore ? (
            <Button variant="contained" onClick={loadMore}>
              Load More
            </Button>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No more movies to show.
            </Typography>
          )}
        </Box>
      </Container>
      <Footer />
    </Layout>
  );
};

export default Home;
