import React from "react";
import { Navigate } from "react-router-dom";

import async from "./components/Async";

// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import AuthGuard from "./components/guards/AuthGuard";
import SignIn from "./pages/auth/SignIn";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";
import Logbook from "./pages/Logbook";
import Inbox from "./pages/Inbox";
import Settings from "./pages/Settings";
const Calendar = async(() => import("./pages/calendar/Calendar"));

const routes = [
  {
    path: "/",
    element: <Navigate to="/inbox" />,
  },
  {
    path: "/inbox",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <Inbox />,
      },
    ],
  },
  {
    path: "/logbook",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <Logbook />,
      },
    ],
  },
  {
    path: "settings",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Settings />,
      },
    ],
  },
  {
    path: "calendar",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Calendar />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "500",
        element: <Page500 />,
      },
    ],
  },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
