import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme(); // Access the current theme

  return (
    <Box
      sx={{
        py: 4,
        mt: 4,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#004d66"
            : theme.palette.background.paper, // Change bg color based on theme mode
        textAlign: "center",
        color: "text.primary",
      }}
    >
      {/* Logo Section */}
      <Box mb={2}>
        <img
          src="/logo2.png"
          alt="Film Cube Logo"
          style={{ maxWidth: "150px", height: "auto" }}
        />
      </Box>

      {/* Social Media Links */}
      <Box mb={2}>
        <IconButton
          aria-label="Facebook"
          href="https://facebook.com"
          sx={{
            color:
              theme.palette.mode === "light"
                ? "#ffffff"
                : theme.palette.primary.main,
          }} // Change icon color based on theme mode
        >
          <Facebook />
        </IconButton>
        <IconButton
          aria-label="Twitter"
          href="https://twitter.com"
          sx={{
            color:
              theme.palette.mode === "light"
                ? "#ffffff"
                : theme.palette.primary.main,
          }} // Change icon color based on theme mode
        >
          <Twitter />
        </IconButton>
        <IconButton
          aria-label="Instagram"
          href="https://instagram.com"
          sx={{
            color:
              theme.palette.mode === "light"
                ? "#ffffff"
                : theme.palette.primary.main,
          }} // Change icon color based on theme mode
        >
          <Instagram />
        </IconButton>
        <IconButton
          aria-label="YouTube"
          href="https://youtube.com"
          sx={{
            color:
              theme.palette.mode === "light"
                ? "#ffffff"
                : theme.palette.primary.main,
          }} // Change icon color based on theme mode
        >
          <YouTube />
        </IconButton>
      </Box>

      {/* Footer Text */}
      <Typography variant="body2" color="text.secondary" mb={1}>
        &copy; {new Date().getFullYear()} Film Cube. All rights reserved.
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <Link href="/privacy-policy" color="inherit" sx={{ mx: 1 }}>
          Privacy Policy
        </Link>
        |{" "}
        <Link href="/terms-of-service" color="inherit" sx={{ mx: 1 }}>
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
