import { Grid2 } from "@mui/material";
import React from "react";

const ProductFeatureSelector = ({ product }) => {
  return (
    <Grid2 container alignContent="center">
      {product.description.name}
    </Grid2>
  );
};

export default ProductFeatureSelector;
