import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search, Menu, Brightness4, Brightness7 } from "@mui/icons-material";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" color="primary" elevation={6}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          {isMobile && (
            <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Film Cube
          </Typography>
        </Box>

        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.palette.background.paper,
              px: 2,
              py: 0.5,
              borderRadius: 2,
              minWidth: 300,
            }}
          >
            <Search sx={{ mr: 1, color: theme.palette.text.secondary }} />
            <InputBase
              placeholder="Search movies…"
              fullWidth
              sx={{ color: theme.palette.text.primary }}
            />
          </Box>
        )}

        <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
