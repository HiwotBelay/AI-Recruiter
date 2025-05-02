import React, { useState } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Autocomplete,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const searchOptions = [
    "Resumes",
    "Candidates",
    "Interviews",
    "Analytics",
    "Chat History",
  ];

  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: isExpanded ? 400 : 200,
        transition: "all 0.3s ease-in-out",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        "&:hover": {
          width: 400,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Autocomplete
        freeSolo
        options={searchOptions}
        value={searchQuery}
        onChange={(event, newValue) => {
          setSearchQuery(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search..."
            variant="standard"
            sx={{
              "& .MuiInputBase-root": {
                padding: "0 8px",
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Typography variant="body2">{option}</Typography>
          </Box>
        )}
        sx={{
          flex: 1,
          "& .MuiAutocomplete-input": {
            padding: "8px",
          },
        }}
      />
    </Paper>
  );
};

export default SearchBar;
