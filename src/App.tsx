import React from "react";

// third-party
import { I18nextProvider } from "react-i18next";
import { SnackbarProvider } from "notistack";
import { CacheProvider } from "@emotion/react";

// project import
import Routes from "@/routes";
import ThemeCustomization from "@/themes";
// import RTLLayout from '@/components/RTLLayout';
import ScrollTop from "@/components/ScrollTop";
import cache from "@/themes/cache";
import i18n from "@/i18n";
import usePageAnalyticsEffect from "@/hooks/usePageAnalyticsEffect";
import useAuthStateDetector from "@/hooks/useAuthStateDetector";
import useHtmlLangSelector from "@/hooks/useHtmlLangSelector";
import useTitle from "@/hooks/useTitle";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  usePageAnalyticsEffect();
  useAuthStateDetector();
  useHtmlLangSelector();
  useTitle(null);

  return (
    <CacheProvider value={cache}>
      <ThemeCustomization>
        {/* <RTLLayout> */}
        <I18nextProvider i18n={i18n}>
          <ScrollTop>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              autoHideDuration={4000}
              dense
            >
              <Routes />
            </SnackbarProvider>
          </ScrollTop>
        </I18nextProvider>
        {/* </RTLLayout> */}
      </ThemeCustomization>
    </CacheProvider>
  );
};

export default App;
