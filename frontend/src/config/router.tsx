import { createBrowserRouter } from "react-router-dom";

import Create from "components/pages/Create";
import Browse from "components/pages/Browse";
import Login from "components/pages/Login";
import Signup from "components/pages/Signup";
import Detail from "components/pages/Detail";
import Edit from "components/pages/Edit";
import Root from "components/pages/Root";
import ComponentTest from "ComponentTest";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <ComponentTest />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "browse/:userId",
        element: <Browse />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "detail/:scheduleId",
        element: <Detail />,
      },
      {
        path: "edit/:scheduleId",
        element: <Edit />,
      },
    ],
  },
]);

export default router;
