import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { MotionConfig } from 'framer-motion';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './ErrorBoundary';
import CustomClerkProvider from './config/ClerkProvider/index.tsx';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <CustomClerkProvider>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </ConvexProviderWithClerk>
      </CustomClerkProvider>
    </ErrorBoundary>
  </StrictMode>,
);
