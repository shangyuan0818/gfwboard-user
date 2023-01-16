import React from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { Box, Grid, Stack, Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useTicketContext } from "@/sections/ticket/context";
import TopBar from "@/sections/ticket/main/topBar";
import InputArea from "@/sections/ticket/main/inputArea";
import ChatHistory from "@/sections/ticket/main/chatHistory";
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles<{
  drawerOpen: boolean;
  drawerWidth: number;
}>()((theme, { drawerOpen, drawerWidth }) => ({
  root: {
    transition: theme.transitions.create("margin", {
      easing: drawerOpen ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
      duration: drawerOpen ? theme.transitions.duration.shorter : theme.transitions.duration.shorter
    }),
    marginLeft: drawerOpen ? 0 : -drawerWidth,
    [theme.breakpoints.down("lg")]: {
      paddingLeft: 0,
      marginLeft: 0
    },
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    flexGrow: 1
  },
  mainCard: {
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : theme.palette.grey[50],
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderRadius: theme.spacing(0, 0.5, 0.5, 0),
    borderLeft: "none",
    height: "100%"
  },
  centerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    height: "100%"
  }
}));

const Main: React.FC = () => {
  const { t } = useTranslation();
  const { drawerOpen, drawerWidth, currentId } = useTicketContext();

  const { classes } = useStyles({
    drawerOpen,
    drawerWidth
  });

  return (
    <Box component={"main"} className={classes.root}>
      <Grid container flexGrow={1}>
        <Grid item xs={12}>
          <MainCard content={false} className={classes.mainCard}>
            <Stack spacing={3} direction={"column"} height={"100%"}>
              {currentId === 0 ? (
                <Box className={classes.centerBox}>
                  <Typography variant={"h5"}>{t("ticket.conversation.none_selected")}</Typography>
                </Box>
              ) : (
                <>
                  <TopBar />
                  <Box flexGrow={1}>
                    <ChatHistory />
                  </Box>
                  <InputArea />
                </>
              )}
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
