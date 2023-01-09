import React from "react";

// project imports
import StatusWrapper from "@/sections/node/status/statusWrapper";
import StatusTable from "@/sections/node/status/statusTable";
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  dataGrip: {
    height: "100%"
  }
}));

const Status: React.FC = () => {
  const { classes } = useStyles();

  return (
    <StatusWrapper className={classes.root}>
      <StatusTable className={classes.dataGrip} />
    </StatusWrapper>
  );
};

export default Status;
