// project import
import { NavItemType } from "@/types/menu";
import { Trans } from "react-i18next";
import { DashboardOutlined, ReadOutlined } from "@ant-design/icons";

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
        },
        {
          id: "knowledge",
          title: <Trans>title::knowledge</Trans>,
          type: "item",
          url: "/knowledge",
          icon: ReadOutlined
        }
      ]
    }
  ]
};

export default menuItems;
