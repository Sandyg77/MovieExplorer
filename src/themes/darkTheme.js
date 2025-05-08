import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "linear-gradient(to right, #141e30, #004d66)",
      paper: "#1a1a1a",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

export default darkTheme;
