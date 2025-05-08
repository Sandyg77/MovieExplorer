import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Layout from "../components/Layout";

// Mock data for favorites (replace with real state or context)
const mockFavorites = [
  {
    id: 1,
    title: "Inception",
    poster_path:
      "https://image.tmdb.org/t/p/w500//qjb5mFiG09h6F0Mk4hKKN2dE9ju.jpg",
    release_date: "2010-07-16",
  },
  {
    id: 2,
    title: "Interstellar",
    poster_path:
      "https://image.tmdb.org/t/p/w500//gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    release_date: "2014-11-07",
  },
];

const Favorites = () => {
  const [favorites, setFavorites] = React.useState(mockFavorites);

  const handleRemove = (id) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
  };

  return (
    <Layout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Your Favourites
        </Typography>
        {favorites.length === 0 ? (
          <Typography variant="body1">
            No favourite movies added yet.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {favorites.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.poster_path}
                    alt={movie.title}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" noWrap>
                        {movie.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {movie.release_date}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => handleRemove(movie.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
};

export default Favorites;
