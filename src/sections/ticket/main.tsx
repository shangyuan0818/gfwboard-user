import React from "react";
import { makeStyles } from "@/themes/hooks";
import { Box } from "@mui/material";
import { useTicketContext } from "@/sections/ticket/context";

const useStyles = makeStyles<{
  drawerOpen: boolean;
  drawerWidth: number;
}>()((theme, { drawerOpen, drawerWidth }) => ({
  root: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: drawerOpen ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
      duration: drawerOpen ? theme.transitions.duration.shorter : theme.transitions.duration.shorter
    }),
    marginLeft: drawerOpen ? 0 : -drawerWidth,
    [theme.breakpoints.down("lg")]: {
      paddingLeft: 0,
      marginLeft: 0
    }
  }
}));

const Main: React.FC = () => {
  const { drawerOpen, drawerWidth } = useTicketContext();
  const { classes } = useStyles({
    drawerOpen,
    drawerWidth
  });

  return <Box component={"main"} className={classes.root}></Box>;
};

export default Main;
