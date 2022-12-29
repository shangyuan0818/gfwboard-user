import React from "react";

// material-ui
import { Stack } from "@mui/material";

// project import
/* import Search from "./Search"; */
import Message from "./Message";
import Profile from "./Profile";
import WorkflowMenu from "./WorkflowMenu";
import Title from "./Title";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent: React.FC = () => {
  // const matchesXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <>
      <Stack direction={"row"} sx={{ flexGrow: 1, mx: 2 }}>
        {/*{!matchesXs && <Search />}*/}
        <Title />
      </Stack>

      <WorkflowMenu />
      <Message />
      <Profile />
    </>
  );
};

export default HeaderContent;
