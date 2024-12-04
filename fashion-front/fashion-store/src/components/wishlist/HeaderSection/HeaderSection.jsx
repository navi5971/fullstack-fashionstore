import { Grid2, Typography } from "@mui/material";
import React from "react";

const wishlistTitles = [
  "Product",
  "Image",
  " Description",
  " Price",
  " Quantity",
  " Total",
];

export const HeaderSection = () => {
  return (
    <Grid2 container sx={{ color: "gray" }}>
      <Typography variant="h4">Wishlist</Typography>
      <Typography variant="h6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid modi
        voluptate similique porro mollitia quas sapiente fugiat commodi sit,
        ipsum eaque impedit saepe pariatur, repudiandae atque est minima iste
        quo.
      </Typography>
      <Grid2 container>
        {wishlistTitles.map((title) => {
          return <Typography variant="h5"> {title}</Typography>;
        })}
      </Grid2>
    </Grid2>
  );
};
