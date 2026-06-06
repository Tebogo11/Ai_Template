import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import Dashboard from './Dashboard';

function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/wardrobe/:wardrobeId/outfit/:outfitId/',
      element: <Dashboard />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
