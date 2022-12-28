import React from "react";
import { Typography } from "@mui/material";
import { useGetGuestConfigQuery } from "@/store/services/api";

const Title: React.FC = () => {
  return (
    <Typography variant="h4" component="span" noWrap>
      {window.settings.title}
    </Typography>
  );
};

export default Title;
