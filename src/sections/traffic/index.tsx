import React from "react";
import { Grid } from "@mui/material";
import TrafficAlert from "@/sections/traffic/trafficAlert";
import TrafficTable from "@/sections/traffic/trafficTable";

const TrafficSection: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TrafficAlert />
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12} height={400}>
        <TrafficTable />
      </Grid>
    </Grid>
  );
};

export default TrafficSection;
