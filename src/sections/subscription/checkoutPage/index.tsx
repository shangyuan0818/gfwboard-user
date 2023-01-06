import React from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import { OrderStatus } from "@/model/order";
import { useCheckoutContext } from "@/sections/subscription/checkoutPage/context";
import ProductInfoCard from "@/sections/subscription/checkoutPage/productInfoCard";

const CheckoutPage: React.FC = () => {
  const {
    callback: { data }
  } = useCheckoutContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProductInfoCard />
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Grid>
      {data === OrderStatus.Pending && <Grid item xs={12} md={4}></Grid>}
    </Grid>
  );
};

export default CheckoutPage;
