import React from "react";

// project import
import Routes from "@/routes";
import ThemeCustomization from "@/themes";
import Locales from "@/components/Locales";
// import RTLLayout from '@/components/RTLLayout';
import ScrollTop from "@/components/ScrollTop";
import Snackbar from "@/components/@extended/Snackbar";
import { CacheProvider } from "@emotion/react";
import cache from "@/themes/cache";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <CacheProvider value={cache}>
    <ThemeCustomization>
      {/* <RTLLayout> */}
      <Locales>
        <ScrollTop>
          <>
            <Routes />
            <Snackbar />
          </>
        </ScrollTop>
      </Locales>
      {/* </RTLLayout> */}
    </ThemeCustomization>
  </CacheProvider>
);

export default App;
