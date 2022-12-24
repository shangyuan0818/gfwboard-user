// project import
import other from "./other";
import { NavItemType } from "@/types/menu";
import { Trans } from "react-i18next";
import { DashboardOutlined } from "@ant-design/icons";

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [
    {
      id: "app",
      title: <Trans>title::app</Trans>,
      type: "group",
      children: [
        {
          id: "dashboard",
          title: <Trans>title::dashboard</Trans>,
          type: "item",
          url: "/dashboard",
          icon: DashboardOutlined
        }
      ]
    }
  ]
};

export default menuItems;
