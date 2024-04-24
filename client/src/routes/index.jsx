import { createBrowserRouter } from "react-router-dom";

import Error404 from '../pages/404/Error404'
import Login from '../pages/login'
import Register from '../pages/register'
import UserDash from '../pages/userDash/UserDash'
import { ProtectedLayout } from './ProtectedRoutes/index'
import Main from '../components/main/index'
import Home from '../pages/home/Home'
import DetailService from '../pages/detailCompra/DetailService'
import AuthUser from '../components/dashboard/authUser'
import ResetPassword from "../components/dashboard/resetPassword";
import Binance from '../pages/detailCompra/Binance/Binance'


export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Main>
        <Error404 />
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
    path: "/",
    element: (
      <Main>
        <Home />
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
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <Main>
            <UserDash />
          </Main>
        ),
      },
      {
        path: "/compra",
        element: (
          <Main>
            <DetailService />
          </Main>
        ),
      },
      {
        path: "/compra/binance",
        element: (
          <Main>
            <Binance />
          </Main>
        ),
      },
    ],
  },
]);
