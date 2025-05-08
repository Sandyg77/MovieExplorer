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
import { Menu, Brightness4, Brightness7 } from "@mui/icons-material";
import SearchBar from "./SearchBar";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="fixed"
      color="primary"
      elevation={4}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side: Logo & Menu */}
        <Box display="flex" alignItems="center">
          {isMobile && (
            <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
              <Menu />
            </IconButton>
          )}
          <Box display="flex" alignItems="center" gap={1}>
            <img
              src="/logo.png"
              alt="Film Cube Logo"
              style={{ maxWidth: 65, height: "auto" }}
            />
            <Typography variant="h6" component="div" noWrap>
              Film Cube
            </Typography>
          </Box>
        </Box>

        {/* Center: SearchBar (desktop only) */}
        {!isMobile && <SearchBar />}

        {/* Right Side: Theme Toggle */}
        <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
