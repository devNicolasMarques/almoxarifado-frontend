import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from './App';
import './index.css';
import ProtectedRoute from "./pages/ProtectedRoute";
import AccessDenied from "./pages/AccessDenied";
import Management from "./pages/Management";
import ClassroomLog from "./pages/ClassroomLog";
import Teacher from "./pages/Teacher";
import Implementando from "./pages/Implementando";
import Keys from "./pages/Keys";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Keys /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/management",
        element: <ProtectedRoute errorPage={<AccessDenied />} targetPage={<Outlet />} />,
        children: [
          { path: "", element: <Management /> },
          { path: "classroomlog", element: <ClassroomLog /> },
          { path: "teacher", element: <Teacher /> },
          { path: "implementando", element: <Implementando /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);