import React, { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Navbar from "./Navbar";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#004d66" },
    secondary: { main: "#00e5ff" },
    background: {
      default: "linear-gradient(to right, #f9f9f9, #dbefff)",
      paper: "#ffffff",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00e5ff" },
    secondary: { main: "#004d66" },
    background: {
      default: "linear-gradient(to right, #141e30, #243b55)",
      paper: "#1a1a1a",
    },
  },
});

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: theme.palette.background.default,
        }}
      >
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
