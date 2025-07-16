import React from "react";
import { Box, Typography } from "@mui/material";

function Summary({ summary }) {
  return (
    <>
      <Typography padding={1} paddingTop={1} paddingLeft={1.5}>
        {summary}
      </Typography>
    </>
  );
}

export default Summary;
