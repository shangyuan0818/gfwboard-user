import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const HtmlLanguagePropertySelector: React.FC = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    window.document.documentElement.lang = String(i18n.language).toLowerCase();
  }, [i18n.language]);

  return null;
};

export default HtmlLanguagePropertySelector;
