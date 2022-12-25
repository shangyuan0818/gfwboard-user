import React, { useEffect } from "react";

// third-party
import { I18nextProvider, useTranslation } from "react-i18next";
import { SnackbarProvider } from "notistack";
import { CacheProvider } from "@emotion/react";

// project import
import Routes from "@/routes";
import ThemeCustomization from "@/themes";
// import RTLLayout from '@/components/RTLLayout';
import ScrollTop from "@/components/ScrollTop";
import cache from "@/themes/cache";
import i18n from "@/i18n";
import { useSelector } from "@/store";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const { t } = useTranslation();
  const title = useSelector((state) => state.view.title);
  useEffect(() => {
    document.title = title
      ? `${t(title, { ns: "title" })}${window.settings.title_split}${window.settings.title}`
      : `${window.settings.title}`;
  }, [title]);

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
