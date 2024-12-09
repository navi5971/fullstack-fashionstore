import { Button, Grid2, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const HeaderSection = () => {
  const navigate = useNavigate();
  return (
    <Grid2
      container
      sx={{ padding: "16px", textAlign: "left" }}
      direction="column"
    >
      <Typography variant="h4">Wishlist</Typography>
      <Typography variant="h6" style={{ textAlign: "-webkit-auto" }}>
        {/*align center given in .App css class*/}Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Aliquid modi voluptate similique porro
        mollitia quas sapiente fugiat commodi sit, ipsum eaque impedit saepe
        pariatur, repudiandae atque est minima iste quo.
      </Typography>
      <Button onClick={() => navigate("/")} sx={{ justifyContent: "left" }}>
        {" "}
        🔙Back
      </Button>
    </Grid2>
  );
};
