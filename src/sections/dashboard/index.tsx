import React from "react";
import lo from "lodash-es";

// material-ui
import { Grid } from "@mui/material";

// project imports
import NoticeCarousel from "@/sections/dashboard/noticeCarousel";

const Dashboard: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <NoticeCarousel />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
