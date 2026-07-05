import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import Dashboard from './Dashboard';
import TermsConditionsOverlay from './components/TermsConditionsOverlay';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Routes() {
  const isOpen = useQuery(api.user.termsandconditions.actions.hasAcceptedTerms, {});

  const onAccepted = useMutation(api.user.termsandconditions.actions.acceptTerms);

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

  return (
    <>
      <RouterProvider router={router} />
      <TermsConditionsOverlay hasAccepted={isOpen || false} onAccepted={onAccepted} />
    </>
  );
}

export default Routes;
