import {
  Divider,
  Grid2,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import product1 from "../../images/img1.jpg";
import { HeaderSection } from "./HeaderSection/HeaderSection";
import { ProductDetailSection } from "./ProductDetailSection/ProductDetailSection";

const products = [
  {
    id: 1,
    name: "Куртка длинная зеленая",
    image: product1,
    colors: ["black", "green", "orange", "blue"],
    sizes: ["S", "M", "L", "XL"],
    price: 9500,
    quantity: 1,
  },
  {
    id: 2,
    name: "Рюкзак Shell",
    image: product1,
    colors: ["black", "blue"],
    sizes: ["M"],
    price: 3500,
    quantity: 1,
  },
];

const WishlistSection = () => {
  return (
    <Grid2
      container
      sx={{ backgroundColor: "yellow", mt: 2 }}
      direction="column"
    >
      <HeaderSection />
      <ProductDetailSection />
    </Grid2>
  );
};

export default WishlistSection;
