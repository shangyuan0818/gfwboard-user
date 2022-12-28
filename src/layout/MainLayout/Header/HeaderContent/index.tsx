import { useMemo } from "react";

// material-ui
import { Theme } from "@mui/material/styles";
import { Box, Stack, useMediaQuery } from "@mui/material";

// project import
/* import Search from "./Search"; */
import Message from "./Message";
import Profile from "./Profile";
import Notification from "./Notification";
import MobileSection from "./MobileSection";
import MegaMenuSection from "./MegaMenuSection";
import Title from "./Title";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      <Stack direction={"row"} sx={{ flexGrow: 1, mx: 2 }}>
        {/*{!matchesXs && <Search />}*/}
        <Title />
      </Stack>
      {!matchesXs && megaMenu}
      {matchesXs && <Box sx={{ width: "100%", ml: 1 }} />}

      <Notification />
      <Message />
      <Profile />
    </>
  );
};

export default HeaderContent;
