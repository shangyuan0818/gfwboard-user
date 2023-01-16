import React from "react";

// material-ui
import { Box } from "@mui/material";

// project imports
import Drawer from "@/sections/ticket/drawer";
import Main from "@/sections/ticket/main";

const TicketSection: React.FC = () => {
  return (
    <Box>
      <Drawer />
      <Main />
    </Box>
  );
};

export default TicketSection;
