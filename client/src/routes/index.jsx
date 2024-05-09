import { createBrowserRouter } from "react-router-dom";
import Main from "../components/main";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
import AuthUser from "../pages/activeUser";
import DashboardUser from "../pages/dashboard";
import { ProtectedLayout } from "./ProtectedRoutes";
import PublicationDetails from "../pages/detailPublication";
import DashboardUserAdmin from "../pages/dashboardAdmin";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Main>
        <Home />
      </Main>
    ),
  },
  {
    path: "/register",
    element: (
      <Main>
        <Register />
      </Main>
    ),
  },
  {
    path: "/login",
    element: (
      <Main>
        <Login />
      </Main>
    ),
  },
  {
    path: "/publications/:id",
    element: (
      <Main>
        <PublicationDetails />
      </Main>
    ),
  },
  {
    path: "/users/active",
    element: (
      <Main>
        <AuthUser />
      </Main>
    ),
  },
  // {
  //   path: "/resetpassword",
  //   element: <ResetPassword />,
  // },
  // {
  //   path: "*",
  //   element: (
  //     <Main>
  //       <Error404 />
  //     </Main>
  //   ),
  // },
  {
    path: "",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <Main>
            <DashboardUser />
          </Main>
        ),
      },
      {
        path: "/dashboard/admin",
        element: (
          <Main>
            <DashboardUserAdmin />
          </Main>
        ),
      },
    ],
  },
]);
