import React from "react";

// material-ui
import { Masonry } from "@mui/lab";

// project imports
import AccountInfoCard from "@/sections/profile/accountInfoCard";
import WalletCard from "@/sections/profile/walletCard";

const Profile: React.FC = () => (
  <Masonry
    spacing={2}
    columns={{
      xs: 1,
      md: 2,
      xl: 3
    }}
  >
    <AccountInfoCard />
    <WalletCard />
  </Masonry>
);

export default Profile;
