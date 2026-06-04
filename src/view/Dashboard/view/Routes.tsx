import { createBrowserRouter, RouterProvider } from 'react-router';
import Dashboard from './DashboardView';

function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/wardrobes/:wardrobeId/outfits/:outfitId',
      element: <Dashboard />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
