// types
import { DefaultConfigProps } from "@/types/config";

export const drawerWidth = 260;

// ==============================|| THEME CONFIG  ||============================== //

const config: DefaultConfigProps = {
  defaultPath: "/",
  fontFamily: `'Public Sans', sans-serif`,
  miniDrawer: false,
  container: true,
  presetColor: "theme1",
  themeDirection: "ltr",
  title: "跨越长城",
  title_split: " - ",
  background_url: "https://unsplash.com/random",
  description: "天下武功 唯快不破",
  logo: "",
  api: "https://sub.crosswalltech.com",
  languages: ["zh-CN", "en-US"],
  googleAnalytics: {
    measurementId: "G-HSJEER5NF4"
  },
  emojiEndpoint: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/{{code}}.png"
};

export default config;
