import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import Dashboard from './Dashboard';
import TermsConditionsOverlay from './components/TermsConditionsOverlay';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Routes() {
  const hasAccepted = useQuery(api.user.termsandconditions.actions.hasAcceptedTerms, {});

  const onAccepted = useMutation(api.user.termsandconditions.actions.acceptTerms);

  // Treat loading as accepted to avoid flashing the overlay before data arrives.
  const hasAcceptedResolved = hasAccepted ?? true;

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
      <TermsConditionsOverlay hasAccepted={hasAcceptedResolved} onAccepted={onAccepted} />
    </>
  );
}

export default Routes;
