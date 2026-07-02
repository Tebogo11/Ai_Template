import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthPage } from './view/Auth/SignInForm';
import { SignUpPage } from './view/Auth/SignUpForm';
import LandingLayout from './Layout';
import PricingPage from './view/Pricing';
import AboutPage from './view/About';
import Contact from './view/Contact';
import BlogIndex from './view/Blog';
import BlogPostPage from './view/Blog/PostView';
import NotFound from './view/NotFound';
import HomePage from './view/Home';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'pricing',
        element: <PricingPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'blog',
        element: <BlogIndex />,
      },
      {
        path: 'blog/:slug',
        element: <BlogPostPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const LandingPage = () => {
  return <RouterProvider router={router} />;
};

export default LandingPage;
