// third-party
import { Trans } from "react-i18next";

// assets
import { ChromeOutlined, QuestionOutlined, DeploymentUnitOutlined } from "@ant-design/icons";

// type
import { NavItemType } from "@/types/menu";

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  DeploymentUnitOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other: NavItemType = {
  id: "other",
  title: <Trans>other</Trans>,
  type: "group",
  children: [
    {
      id: "sample-page",
      title: <Trans>sample_page</Trans>,
      type: "item",
      url: "/sample-page",
      icon: icons.ChromeOutlined
    },
    {
      id: "documentation",
      title: <Trans>documentation</Trans>,
      type: "item",
      url: "https://codedthemes.gitbook.io/mantis/",
      icon: icons.QuestionOutlined,
      external: true,
      target: true,
      chip: {
        label: "gitbook",
        color: "secondary",
        size: "small"
      }
    },
    {
      id: "roadmap",
      title: <Trans>roadmap</Trans>,
      type: "item",
      url: "https://codedthemes.gitbook.io/mantis/roadmap",
      icon: icons.DeploymentUnitOutlined,
      external: true,
      target: true
    }
  ]
};

export default other;
