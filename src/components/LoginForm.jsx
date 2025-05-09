import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1e88e5" },
    secondary: { main: "#00acc1" },
    background: {
      default: "linear-gradient(to right,rgb(0, 207, 207), #ffffff)",
      paper: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          background:
            "linear-gradient(135deg,rgb(0, 207, 207) 0%, #ffffff 100%)",
          color: "#004d66",
          "&:hover": {
            background:
              "linear-gradient(135deg,rgb(0, 207, 207) 20%, #ffffff 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 5px 15px rgba(0, 77, 102, 0.3)",
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00e5ff" },
    secondary: { main: "#004d66" },
    background: {
      default: "linear-gradient(to right, #141e30, #004d66)",
      paper: "#1a1a1a",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          background: "linear-gradient(135deg, #00e5ff 0%, #004d66 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #00e5ff 20%, #004d66 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 5px 15px rgba(0, 229, 255, 0.3)",
          },
        },
      },
    },
  },
});

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoading(true);
      setTimeout(() => {
        localStorage.setItem("filmCubeUser", username);
        navigate("/home");
      }, 1000);
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: theme.palette.background.default,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            width: "100%",
            maxWidth: "1000px",
            height: isMobile ? "auto" : "600px",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Login Form */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              padding: { xs: 3, md: 4 },
              background: theme.palette.background.paper,
            }}
          >
            {/* Theme Toggle Icon */}
            <IconButton
              onClick={() => setIsDarkMode(!isDarkMode)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
              color="inherit"
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <Typography
              variant="h4"
              sx={{
                mb: 1,
                fontWeight: 700,
                textAlign: "center",
                background: "linear-gradient(90deg, #00e5ff, #004d66)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome Back!
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, textAlign: "center" }}
            >
              Please log in to your account
            </Typography>

            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  input: {
                    color: theme.palette.text.primary,
                  },
                  label: {
                    color: theme.palette.text.primary,
                  },
                  ".MuiOutlinedInput-root": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                    borderRadius: "6px",
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOff
                            sx={{ color: theme.palette.text.primary }}
                          />
                        ) : (
                          <Visibility
                            sx={{ color: theme.palette.text.primary }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  input: {
                    color: theme.palette.text.primary,
                  },
                  label: {
                    color: theme.palette.text.primary,
                  },
                  ".MuiOutlinedInput-root": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                    borderRadius: "6px",
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  mb: 2,
                  position: "relative",
                  overflow: "hidden",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    animation: isLoading ? "shimmer 2s infinite" : "none",
                  },
                  "@keyframes shimmer": {
                    "100%": { left: "100%" },
                  },
                }}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </Box>
          </Box>

          {/* Image Box */}
          {!isMobile && (
            <Box
              sx={{
                flex: 1,
                backgroundImage: "url('/login.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "400px",
              }}
              aria-label="Login illustration"
            />
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
