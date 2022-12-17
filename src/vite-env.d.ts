/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  readonly settings: WindowSettings;
}

interface WindowSettings {
  title: string;
  theme_path: string;
  theme: {
    sidebar: string;
    header: string;
    default: string;
  };
  version: string;
  background_url: string;
  description: string;
  logo: string;
}
