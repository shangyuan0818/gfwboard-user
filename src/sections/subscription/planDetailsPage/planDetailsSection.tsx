import React from "react";
import { Grid } from "@mui/material";
import PlanInfoCard from "@/sections/subscription/planDetailsPage/planInfoCard";

const PlanDetailsSection: React.FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={8}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PlanInfoCard />
        </Grid>
        <Grid item xs={12}>
          <p>select-price</p>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={4}>
      <p>coupon</p>
    </Grid>
  </Grid>
);

export default PlanDetailsSection;
