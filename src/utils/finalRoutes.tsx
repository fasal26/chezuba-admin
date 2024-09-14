import { Dashboard } from "@pages/dashboard";
import { Menu } from "@pages/menu";
import { CreateMenu } from "@pages/menu/CreateMenu";
// import { Navbar } from "@widgets/navbar";
import { Route } from "react-router-dom";


export const FinalRoutes = () => {
  const routes = [
    { path: "/", element: <Dashboard /> },
    { path: "/menu", element: <Menu /> },
    { path: "/menu-details", element: <CreateMenu /> },
  ];

  return routes.map(route => <Route key={route.path} path={route.path} element={route.element} />);
}
