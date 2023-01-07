/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  settings: WindowSettings;
}

interface WindowSettings {
  title: string;
  title_split: string;
  background_url: string;
  description: string;
  logo: string | null;
  api: string;
  languages: string[];
}
