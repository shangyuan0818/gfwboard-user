import React from "react";
import { Grid } from "@mui/material";
import MyInvitationCard from "@/sections/invite/invitePage/myInvitationCard";

const InvitePage: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <MyInvitationCard />
      </Grid>
      <Grid item xs={12} md={6}>
        <h1>Invite</h1>
      </Grid>
      <Grid item xs={12}>
        <h1>Invite</h1>
      </Grid>
    </Grid>
  );
};

export default InvitePage;
