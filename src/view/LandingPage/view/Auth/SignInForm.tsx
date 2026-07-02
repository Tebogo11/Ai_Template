import { SignIn } from '@clerk/clerk-react';
import Header from './components/Header';
import { useAppSetting } from '@/store/useAppSetting';
import Seo from '../../components/Seo';

export const AuthPage = () => {
  const { theme } = useAppSetting(); // Ensure the auth context is initialized
  return (
    <div className="bg-base-100 text-base-content relative h-svh min-h-[700px] overflow-y-auto">
      <Seo
        title="Login - Outfit AI"
        description="Sign in to your Outfit AI account."
        url="/login"
        siteBase="https://o-ai.co.uk"
        noindex
        nofollow
      />
      <Header />

      <div className="flex h-svh w-full min-w-3/5 flex-1">
        {/* Left side (hidden on mobile) */}
        <div className="relative hidden h-full min-w-3/5 flex-1 overflow-clip md:flex">
          <div className="absolute top-0 bottom-0 left-0 min-h-full min-w-full">
            <video
              autoPlay
              muted
              loop
              className="h-full w-full rounded-lg p-3 pt-20"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            >
              {theme !== 'light' ? (
                <source src={'/assets/pages/auth/AuthVideoDark.mp4'} type="video/webm" />
              ) : (
                <source src={'/assets/pages/auth/AuthVideoLight.mp4'} type="video/webm" />
              )}
              <img
                src={`/assets/pages/auth/AuthVideoFallback.jpg`}
                alt="Auth Video Fallback"
                className="h-full w-full object-cover"
              />
            </video>
          </div>
        </div>

        {/* Right side */}
        <div className="bg-base-100 dark:bg-darkBackground h-svh w-full flex-col px-6 lg:w-2/5">
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
          <div className="flex-center w-full pt-20">
            <SignIn
              appearance={{
                elements: {
                  card: 'rounded-none p-6',
                  cardBox: 'p-1',
                  formButtonPrimary:
                    'bg-black hover:bg-gray-900 text-white w-full rounded-md py-2 mt-2',
                  footerActionText: 'text-lg text-gray-600',
                  footerActionLink: 'text-pink-500 font-medium',
                  // footerAction: { display: "none" },
                },

                layout: { socialButtonsVariant: 'iconButton' },
              }}
              forceRedirectUrl={'/'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
