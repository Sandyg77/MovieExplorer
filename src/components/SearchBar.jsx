import React from "react";
import { Box, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const SearchBar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        px: 2,
        py: 0.5,
        borderRadius: 2,
        minWidth: { xs: "100%", sm: 300 },
        maxWidth: 400,
      }}
    >
      <Search sx={{ mr: 1, color: theme.palette.text.secondary }} />
      <InputBase
        placeholder="I'm searching for..."
        fullWidth
        sx={{ color: theme.palette.text.primary }}
      />
    </Box>
  );
};

export default SearchBar;
