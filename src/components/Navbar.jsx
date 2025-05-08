import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu, Brightness4, Brightness7, Favorite } from "@mui/icons-material";
import SearchBar from "./SearchBar";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="fixed"
      elevation={4}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#004d66"
            : theme.palette.background.paper,
        px: 2,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          width: "100%",
          gap: isMobile ? 1 : 0,
          py: isMobile ? 1 : 0,
        }}
      >
        {/* Left: Logo & Menu */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent={isMobile ? "center" : "flex-start"}
          width={isMobile ? "100%" : "auto"}
          gap={1}
        >
          {isMobile && (
            <IconButton edge="start" color="inherit">
              <Menu />
            </IconButton>
          )}
          <img
            src="/logo.png"
            alt="Film Cube Logo"
            style={{ maxWidth: 50, height: "auto" }}
          />
          <Typography variant="h6" noWrap>
            Film Cube
          </Typography>
        </Box>

        {/* Right: Search + Favorite + Theme */}
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent={isMobile ? "flex-start" : "flex-end"}
          width={isMobile ? "100%" : "auto"}
          mt={isMobile ? 1 : 0}
          gap={1}
        >
          <Box sx={{ width: isMobile ? "100%" : 350 }}>
            <SearchBar />
          </Box>
          <Box display="flex" gap={1}>
            <IconButton color="inherit" aria-label="favourites">
              <Favorite />
            </IconButton>
            <IconButton color="inherit" onClick={toggleTheme}>
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
