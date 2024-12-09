import { Button, Grid2, Typography } from "@mui/material";
import React from "react";
import img1 from "../../../../images/img1.jpg";
import img2 from "../../../../images/img2.jpg";
import img3 from "../../../../images/img3.jpg";
import ProductFeatureSelector from "./ProducFeatureSelector.jsx/ProductFeatureSelector";
import OrderSummary from "../OrderSummarySection/OrderSummary";

export const WishlistProductsList = () => {
  const PRODUCTS = [
    {
      image: img1,
      description: { name: "T-shirt", color: "red", size: "L" },
      size: "XL",
      price: 2500,
      quantity: 2,
      total: 5000,
    },

    {
      image: img3,
      description: { name: "Short", color: "Black", size: "S" },
      size: "L",
      price: 1500,
      quantity: 4,
      total: 6000,
    },
    {
      image: img2,
      description: { name: "Shirt", color: "Pink", size: "XL" },
      size: "XL",
      price: 2500,
      quantity: 3,
      total: 7500,
    },
    {
      image: img1,
      description: { name: "Shirt", color: "Pink", size: "XL" },
      size: "XL",
      price: 2500,
      quantity: 3,
      total: 7500,
    },
    {
      image: img3,
      description: { name: "Short", color: "Black", size: "S" },
      size: "L",
      price: 1500,
      quantity: 4,
      total: 6000,
    },
  ];

  return (
    <>
      <Grid2 container>
        <Grid2 container spacing={2} sx={{ width: "70%" }}>
          {PRODUCTS.map((product, index) => {
            return (
              <Grid2
                container
                key={index}
                sx={{
                  width: "-webkit-fill-available",
                  justifyContent: "space-evenly",
                  backgroundColor: "#eeeeee",
                  padding: "16px",
                  margin: "0 2% 0 5%",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <img src={product.image} alt="proiduct" height="150px" />
                <ProductFeatureSelector product={product} />
                <Typography alignContent="center">{product.size}</Typography>
                <Typography alignContent="center">{product.price}</Typography>
                <Typography alignContent="center">
                  {product.quantity}
                </Typography>
                <Typography alignContent="center">{product.total}</Typography>
              </Grid2>
            );
          })}
        </Grid2>
        {/* RIGHT-SIDE-ORDER_SUMMARY-SECTION */}
        <OrderSummary />
      </Grid2>
    </>
  );
};
