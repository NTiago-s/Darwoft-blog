import { createBrowserRouter } from "react-router-dom";
import Main from "../components/main";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
export const router = createBrowserRouter([
  // {
  //   path: "*",
  //   element: (
  //     <Main>
  //       <Error404 />
  //     </Main>
  //   ),
  // },
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
  // {
  //   path: "/users/active",
  //   element: (
  //     <Main>
  //       <AuthUser />
  //     </Main>
  //   ),
  // },
  // {
  //   path: "/resetpassword",
  //   element: <ResetPassword />,
  // },
  // {
  //   path: "",
  //   element: <ProtectedLayout />,
  //   children: [
  //     {
  //       path: "/dashboard",
  //       element: (
  //         <Main>
  //           <UserDash />
  //         </Main>
  //       ),
  //     },
  //     {
  //       path: "/compra",
  //       element: (
  //         <Main>
  //           <DetailService />
  //         </Main>
  //       ),
  //     },
  //     {
  //       path: "/compra/binance",
  //       element: (
  //         <Main>
  //           <Binance />
  //         </Main>
  //       ),
  //     },
  //   ],
  // },
]);
