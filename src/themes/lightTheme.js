import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "linear-gradient(to right,rgb(0, 207, 207), #ffffff)",
      paper: "#f5f5f5",
    },
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default lightTheme;
