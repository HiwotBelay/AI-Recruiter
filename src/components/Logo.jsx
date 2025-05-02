import React from "react";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Infinite Sign */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            width: "15px",
            height: "15px",
            border: "3px solid #deb887",
            borderRadius: "50%",
            animation: "rotate 4s linear infinite",
          },
          "&::before": {
            left: "5px",
            top: "12px",
            borderLeft: "none",
            borderBottom: "none",
          },
          "&::after": {
            right: "5px",
            top: "12px",
            borderRight: "none",
            borderTop: "none",
          },
          "@keyframes rotate": {
            "0%": {
              transform: "rotate(0deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
        }}
      >
        {/* Center Line */}
        <Box
          sx={{
            position: "absolute",
            width: "20px",
            height: "3px",
            backgroundColor: "#deb887",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>
    </Box>
  );
};

export default Logo;
