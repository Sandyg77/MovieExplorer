import React from "react";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";

const Banner = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: { xs: "56px", sm: "64px" },
        height: { xs: "400px", sm: "500px" },
        position: "relative",
        backgroundImage: "url(/banner.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            mb: 2,
            fontSize: { xs: "2rem", sm: "3rem", md: "3.75rem" },
          }}
        >
          Roll the Cube. Find Your Film
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 4,
            opacity: 0.9,
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          Discover your next favorite movie with our curated selection of films
          from around the world.
        </Typography>

        <Button
          variant="contained"
          size="large"
          color="secondary"
          startIcon={<ExploreIcon />}
          sx={{
            borderRadius: 28,
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            textTransform: "none",
            boxShadow: theme.shadows[10],
            "&:hover": {
              boxShadow: theme.shadows[15],
            },
          }}
        >
          Explore Films
        </Button>
      </Container>
    </Box>
  );
};

export default Banner;
