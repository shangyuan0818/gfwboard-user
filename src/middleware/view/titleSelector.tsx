import React, { useEffect } from "react";
import lo from "lodash-es";
import { useTranslation } from "react-i18next";
import { useSelector } from "@/store";

const TitleSelector: React.FC = () => {
  const { t } = useTranslation();
  const title = useSelector((state) => state.view.title);
  useEffect(() => {
    console.log("title changed");

    if (lo.isNull(title)) {
      document.title = `${window.settings.title}`;
    } else {
      document.title = `${t(title, { ns: "title" })}${window.settings.title_split}${window.settings.title}`;
    }
  }, [title]);

  return null;
};

export default TitleSelector;
