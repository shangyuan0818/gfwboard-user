import React from "react";

// third-party
import { I18nextProvider } from "react-i18next";

// project import
import Routes from "@/routes";
import ThemeCustomization from "@/themes";
// import RTLLayout from '@/components/RTLLayout';
import ScrollTop from "@/components/ScrollTop";
import Snackbar from "@/components/@extended/Snackbar";
import { CacheProvider } from "@emotion/react";
import cache from "@/themes/cache";
import i18n from "@/i18n";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <CacheProvider value={cache}>
    <ThemeCustomization>
      {/* <RTLLayout> */}
      <I18nextProvider i18n={i18n}>
        <ScrollTop>
          <>
            <Routes />
            <Snackbar />
          </>
        </ScrollTop>
      </I18nextProvider>
      {/* </RTLLayout> */}
    </ThemeCustomization>
  </CacheProvider>
);

export default App;
