import React from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import { OrderStatus } from "@/model/order";
import { useCheckoutContext } from "./context";
import ProductInfoCard from "./productInfoCard";
import StatusCard from "./statusCard";
import OrderInfoCard from "./orderInfoCard";

const CheckoutPage: React.FC = () => {
  const { status } = useCheckoutContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Grid container spacing={2}>
          {typeof status === "undefined" ||
            (status !== OrderStatus.PENDING && (
              <Grid item xs={12}>
                <StatusCard />
              </Grid>
            ))}
          <Grid item xs={12}>
            <ProductInfoCard />
          </Grid>
          <Grid item xs={12}>
            <OrderInfoCard />
          </Grid>
          {typeof status === "undefined" || (status === OrderStatus.PENDING && <Grid item xs={12}></Grid>)}
        </Grid>
      </Grid>
      {typeof status === "undefined" || (status === OrderStatus.PENDING && <Grid item xs={12} md={4}></Grid>)}
    </Grid>
  );
};

export default CheckoutPage;
