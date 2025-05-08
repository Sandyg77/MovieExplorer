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

const API_KEY = "YOUR_TMDB_API_KEY"; // Replace with TMDb key

const Home = () => {
  const [movies, setMovies] = useState([]);
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
        setMovies((prev) => [...prev, ...res.data.results]);
        setHasMore(res.data.page < res.data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (err) {
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

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography variant="h4" mb={3}>
          Trending Movies
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} onClick={() => {}} />
            </Grid>
          ))}
        </Grid>

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
    </Layout>
  );
};

export default Home;
