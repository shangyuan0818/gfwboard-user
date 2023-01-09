import React, { useEffect } from "react";
import lo from "lodash-es";
import { useTranslation } from "react-i18next";
import { useTitle as useTitleHook } from "ahooks";

// project imports
import config from "@/config";

const useTitle = (title: string | null, deps: React.DependencyList = []) => {
  const { t } = useTranslation();
  useEffect(() => {
    window.document.title = lo.isNull(title)
      ? `${config.title}`
      : `${t(title, { ns: "title" })}${config.title_split}${config.title}`;
  }, [t, title, ...deps]);
};

export default useTitle;
