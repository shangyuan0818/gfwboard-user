// types
import { DefaultConfigProps } from "@/types/config";

export const drawerWidth = 260;

export const twitterColor = "#1DA1F2";
export const facebookColor = "#3b5998";
export const linkedInColor = "#0e76a8";

// ==============================|| THEME CONFIG  ||============================== //

const config: DefaultConfigProps = {
  defaultPath: "/",
  fontFamily: `'Public Sans', sans-serif`,
  i18n: "en",
  miniDrawer: false,
  container: true,
  mode: "light",
  presetColor: "default",
  themeDirection: "ltr",
  title: "跨越长城",
  title_split: " - ",
  background_url: "https://unsplash.com/random",
  description: "天下武功 唯快不破",
  logo: "",
  api: "https://sub.crosswalltech.com",
  languages: ["zh-CN", "en-US"]
};

export default config;
