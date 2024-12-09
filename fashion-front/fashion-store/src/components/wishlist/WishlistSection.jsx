import { Grid2 } from "@mui/material";
import React from "react";
import { HeaderSection } from "./HeaderSection/HeaderSection";
import { WishlistProductsList } from "./ProductDetailSection/WishlistProductsListSection/WishlistProductsList";

const WishlistSection = () => {
  return (
    <Grid2 container direction="column" sx={{ backgroundColor: "white" }}>
      <HeaderSection />
      <WishlistProductsList />
    </Grid2>
  );
};

export default WishlistSection;
