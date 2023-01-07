// project import
import { NavItemType } from "@/types/menu";
import { DashboardOutlined, MonitorOutlined, ReadOutlined, ShoppingOutlined } from "@ant-design/icons";

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
    },
    {
      id: "subscription",
      title: "subscription",
      type: "group",
      children: [
        {
          id: "buy-plan",
          title: "buy-plan",
          type: "item",
          url: "/plan/buy",
          icon: ShoppingOutlined
        },
        {
          id: "status",
          title: "status",
          type: "item",
          url: "/service/status",
          icon: MonitorOutlined
        }
      ]
    }
  ]
};

export default menuItems;
