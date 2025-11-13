import { SignIn, useAuth } from "@clerk/clerk-react";
import Header from "./components/Header";

export const AuthPage = () => {
  const {} = useAuth(); // Ensure the auth context is initialized
  return (
    <div className="h-dvh overflow-hidden relative bg-base-100 text-base-content">
      <Header />

      <div
        className="flex w-full overflow-y-hidden"
        style={{ height: "100dvh", overflow: "hidden" }}
      >
        {/* Left side (hidden on mobile) */}
        <div className="hidden md:flex w-3/5 h-full overflow-clip border-r-4 border-primary ">
          <img
            src="/assets/loginPageAsset.png"
            alt="Fashion"
            loading="eager" // load immediately
            decoding="async" // doesn’t block rendering
            className="object-cover h-full w-full object-top"
            style={{ minHeight: "100dvh" }}
          />
        </div>

        {/* Right side */}
        <div className="flex-center flex-col w-full lg:w-2/5 px-6 bg-background dark:bg-darkBackground max-h-[40dvh] mt-80  ">
          {/* Logo */}
          {/* <div className="flex flex-col items-start mb-6">
            <div className="text-pink-500 text-5xl font-bold">
              <LazyLoadImage
                src={`/assets/logo/${theme === "light" ? "Logo" : "Logo-white"}.png`}
                width={100}
                height={100}
              />
            </div>
            <div className="text-lg font-semibold tracking-[0.3em] mt-2">
              <h1 className="login-outfit tracking-[-0.0em] text-[36px] ">
                Outfit
              </h1>
            </div>
          </div> */}

          {/* Clerk SignIn */}
          <div className="w-full flex-center">
            <SignIn
              appearance={{
                elements: {
                  card: "rounded-none p-6",
                  cardBox: "p-1",
                  formButtonPrimary:
                    "bg-black hover:bg-gray-900 text-white w-full rounded-md py-2 mt-2",
                  footerActionText: "text-lg text-gray-600",
                  footerActionLink: "text-pink-500 font-medium",
                  // footerAction: { display: "none" },
                },

                layout: { socialButtonsVariant: "iconButton" },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
