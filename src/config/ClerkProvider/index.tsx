import { useAppSetting } from "@/store/useAppSetting";
import { clerkDark, clerkLight } from "@/theme/ClerkTheme";
import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";

const CustomClerkProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useAppSetting();
  return (
    <ClerkProvider
      localization={{
        signIn: {
          start: {
            title: "Sign in to Outfit", // custom header title
          },
        },
      }}
      appearance={{
        ...(theme === "dark" ? clerkDark : clerkLight),
      }}
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
};

export default CustomClerkProvider;
