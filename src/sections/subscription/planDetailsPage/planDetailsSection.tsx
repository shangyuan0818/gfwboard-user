import React from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import PlanInfoCard from "@/sections/subscription/planDetailsPage/planInfoCard";
import PeriodSelectCard from "@/sections/subscription/planDetailsPage/periodSelectCard";

const PlanDetailsSection: React.FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={8}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PlanInfoCard />
        </Grid>
        <Grid item xs={12}>
          <PeriodSelectCard />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={4}>
      <p>coupon</p>
    </Grid>
  </Grid>
);

export default PlanDetailsSection;
