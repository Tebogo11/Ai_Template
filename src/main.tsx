import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";
import { clerkDark } from "./theme/ClerkTheme.ts";
import { useAppSetting } from "./store/useAppSetting.ts";
import CustomClerkProvider from "./confg/ClerkProvider/index.tsx";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ErrorBoundary> */}
    <CustomClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <App />
      </ConvexProviderWithClerk>
    </CustomClerkProvider>
    {/* </ErrorBoundary> */}
  </StrictMode>,
);
