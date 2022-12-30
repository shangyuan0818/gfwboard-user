import React from "react";

// third-party
import lo from "lodash-es";

// hooks
import { useTranslation } from "react-i18next";
import { useTitle } from "ahooks";

// project import
import { useSelector } from "@/store";

const TitleSelector: React.FC = () => {
  const { t } = useTranslation();
  const title = useSelector((state) => state.view.title);
  useTitle(
    lo.isNull(title)
      ? `${window.settings.title}`
      : `${t(title, { ns: "title" })}${window.settings.title_split}${window.settings.title}`,
    {
      restoreOnUnmount: true
    }
  );

  return null;
};

export default TitleSelector;
