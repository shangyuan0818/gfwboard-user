import React, { useMemo } from "react";

// project imports
import useTitle from "@/hooks/useTitle";
import { Grid } from "@mui/material";
import PlanInfoCard from "@/sections/subscription/planDetailsPage/planInfoCard";
import { useParams } from "react-router-dom";

const PlanDetails: React.FC = () => {
  useTitle("buy-plan");

  const idRaw = useParams<{ id: string }>().id;
  const id = useMemo(() => (idRaw ? parseInt(idRaw) || 0 : 0), [idRaw]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PlanInfoCard id={id} />
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
};

export default PlanDetails;
