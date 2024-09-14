import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { FinalRoutes } from '@utils/finalRoutes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route shouldRevalidate={() => false} errorElement={'Technical error'}>
        {FinalRoutes()}
      </Route>
    </>
  )
);

const AppRoutes = () => (
  <RouterProvider router={router} />
)


export {
  router,
  AppRoutes
};