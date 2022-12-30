// project import
import { NavItemType } from "@/types/menu";
import { Trans } from "react-i18next";
import { DashboardOutlined, ReadOutlined } from "@ant-design/icons";

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [
    {
      id: "app",
      title: "app",
      type: "group",
      children: [
        {
          id: "dashboard",
          title: "dashboard",
          type: "item",
          url: "/dashboard",
          icon: DashboardOutlined
        },
        {
          id: "knowledge",
          title: "knowledge",
          type: "item",
          url: "/knowledge",
          icon: ReadOutlined
        }
      ]
    }
  ]
};

export default menuItems;
