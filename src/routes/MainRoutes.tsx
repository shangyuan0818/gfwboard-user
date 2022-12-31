import { lazy } from "react";

// project import
import MainLayout from "@/layout/MainLayout";
// import CommonLayout from "@/layout/CommonLayout";
import Loadable from "@/components/Loadable";
import AuthGuard from "@/utils/route-guard/AuthGuard";
import { Navigate, RouteObject } from "react-router";

// pages routing
const MaintenanceError = Loadable(lazy(() => import("@/pages/maintenance/404")));
// const MaintenanceError500 = Loadable(lazy(() => import("@/pages/maintenance/500")));
// const MaintenanceUnderConstruction = Loadable(lazy(() => import("@/pages/maintenance/under-construction")));
// const MaintenanceComingSoon = Loadable(lazy(() => import("@/pages/maintenance/coming-soon")));

// render
// const SamplePage = Loadable(lazy(() => import("@/pages/extra-pages/sample-page")));
const Dashboard = Loadable(lazy(() => import("@/pages/main/dashboard")));
const Knowledge = Loadable(lazy(() => import("@/pages/main/knowledge")));
const KnowledgePost = Loadable(lazy(() => import("@/pages/main/knowledgePost")));
const PlanPage = Loadable(lazy(() => import("@/pages/subscription/planPage")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: "/",
  children: [
    {
      path: "/",
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "/",
          element: <Navigate to={"/dashboard"} />
        },
        {
          path: "dashboard",
          element: <Dashboard />
        },
        {
          path: "knowledge",
          element: <Knowledge />
        },
        {
          path: "knowledge/:id",
          element: <KnowledgePost />
        },
        {
          path: "subscription/buy",
          element: <PlanPage />
        }
      ]
    },
    {
      path: "*",
      element: <MaintenanceError />
    }
    // {
    //   path: "/maintenance",
    //   element: <CommonLayout />,
    //   children: [
    //     {
    //       path: "404",
    //       element: <MaintenanceError />
    //     },
    //     {
    //       path: "500",
    //       element: <MaintenanceError500 />
    //     },
    //     {
    //       path: "under-construction",
    //       element: <MaintenanceUnderConstruction />
    //     },
    //     {
    //       path: "coming-soon",
    //       element: <MaintenanceComingSoon />
    //     }
    //   ]
    // }
  ]
};

export default MainRoutes;
