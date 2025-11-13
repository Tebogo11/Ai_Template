import type { Theme } from "@clerk/types";

// Example theme switch helper (adjust to your app)
// const isDark =
//   typeof window !== "undefined" &&
//   document.documentElement.getAttribute("data-theme")?.includes("dark");

/* ─────────────── LIGHT (matches Daisy “outfit”) ─────────────── */
export const clerkLight: Theme = {
  variables: {
    // Using Accent (refined blue) for primary actions in Clerk
    colorPrimary: "hsl(182, 100%, 20%)",
    colorText: "hsl(219, 44%, 4%)",
    colorBackground: "hsl(308, 26%, 98%)",
    colorInputBackground: "hsl(308, 9%, 90%)",
    colorInputText: "hsl(219, 44%, 4%)",
    colorTextSecondary: "hsl(217, 12%, 40%)",
    colorDanger: "hsl(0, 100%, 55%)",
    colorSuccess: "hsl(87, 59%, 31%)",
    colorWarning: "hsl(43, 100%, 40%)",
    colorShimmer: "hsl(35, 90%, 35%)", // warm sheen
    colorNeutral: "hsl(217, 15%, 15%)",
    borderRadius: "2px",
    fontSize: "16px",
    spacing: "20px",
    fontWeight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    fontFamily: `"Outfit", sans-serif;`,
  },
  elements: {
    // containers / cards
    card: "bg-[hsl(308,26%,98%)] sm:bg-[hsl(308,9%,90%)] text-[hsl(219,44%,4%)] shadow-xl border border-[hsla(217,15%,15%,0.20)]",
    headerTitle: "text-[hsl(219,44%,4%)]",
    headerSubtitle: "text-[hsla(219,44%,4%,0.70)]",

    // inputs
    formFieldLabel: "text-[hsl(219,44%,4%)]",
    formFieldInput:
      "bg-[hsl(308,9%,90%)] text-[hsl(219,44%,4%)] border border-[hsla(217,15%,15%,0.30)] focus:border-[hsl(196,100%,27%)] focus:ring-[hsl(196,100%,27%)] ",

    // primary actions
    formButtonPrimary:
      "bg-[hsl(196,100%,27%)] hover:opacity-90 text-white  font-medium",
    pricingTableCardFooterButton: "font-bold hover:opacity-20 ",

    // secondary actions / links
    formButtonReset:
      "bg-[hsl(308,12%,94%)] hover:bg-[hsl(308,9%,90%)] text-[hsl(219,44%,4%)]",
    footerAction__signIn:
      "text-[hsl(219,44%,4%)] [&>button]:text-[hsl(196,100%,27%)] [&>button:hover]:opacity-90",
    footerAction__signUp:
      "text-[hsl(219,44%,4%)] [&>button]:text-[hsl(196,100%,27%)] [&>button:hover]:opacity-90",
    userButtonBox:
      "h-fit w-fit border border-2 border-primary text-[hsl(194,73%,25%)] hover:border-accent transition-colors rounded-full",

    identityPreview: "bg-[hsl(308,9%,90%)]",
    socialButtonsIconButton:
      "border border-[hsla(217,15%,15%,0.30)] hover:border-[hsl(196,100%,27%)]",
    alert:
      "bg-[hsla(35,90%,35%,0.15)] border border-[hsl(35,90%,35%)] text-[hsl(219,44%,4%)]",
  },
  layout: {
    socialButtonsPlacement: "bottom",
    shimmer: true,
    logoPlacement: "inside",
  },
};

/* ─────────────── DARK (matches Daisy “outfit-dark”) ─────────────── */
export const clerkDark: Theme = {
  variables: {
    // Keep Accent for primary for consistent interaction color
    colorPrimary: "hsl(182, 65%, 25%)",
    colorText: "hsl(37, 46%, 58%)",
    colorBackground: "hsl(306, 16%, 15%)",
    colorInputBackground: "hsl(306, 18%, 10%)",
    colorInputText: "hsl(37, 46%, 58%)",
    colorTextSecondary: "hsl(301, 2%, 79%)",
    colorDanger: "hsl(10, 95%, 75%)",
    colorSuccess: "hsl(93, 25%, 62%)",
    colorWarning: "hsl(43, 100%, 69%)",
    colorShimmer: "hsl(300, 19%, 40%)",
    colorNeutral: "hsl(300, 19%, 100%)",
    borderRadius: "2px",
    fontSize: "16px",
    spacing: "20px",
    fontWeight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    fontFamily: `"Outfit", sans-serif;`,
  },

  elements: {
    card: "bg-[hsl(306,16%,13%)] text-[hsl(37,46%,58%)] shadow-2xl  border border-[hsla(300,19%,6%,0.40)]",
    headerTitle: "text-[hsl(37,46%,58%)]",
    headerSubtitle: "text-[hsla(37,46%,58%,0.70)]",
    button: "bg-[#000] text-white hover:opacity-90 font-bold",
    formFieldLabel: "text-[hsl(37,46%,58%)]",
    formFieldInput:
      "bg-[hsl(306,18%,10%)] text-[hsl(37,46%,58%)] border border-[hsla(300,19%,6%,0.40)] focus:border-[hsl(194,73%,25%)] focus:ring-[hsl(194,73%,25%)] ",
    pricingTableCardFooterButton: "font-bold hover:opacity-20 ",

    formButtonPrimary: "hover:opacity-90 text-white font-medium",
    formButtonReset:
      "bg-[hsl(306,18%,10%)] hover:bg-[hsl(306,27%,6%)] text-[hsl(37,46%,58%)]",
    userButtonPopoverActionButton: "",
    footerAction__signIn:
      "text-[hsl(37,46%,58%)] [&>button]:text-[hsl(194,73%,25%)]",
    footerAction__signUp:
      "text-[hsl(37,46%,58%)] [&>button]:text-[hsl(194,73%,25%)]",
    pricingTableCardTitle: "text-[hsl(37,46%,58%)] font-bold ",
    identityPreview: "bg-[hsl(306,18%,10%)]",
    socialButtonsIconButton:
      "border border-[hsla(300,19%,6%,0.40)] hover:border-[hsl(194,73%,25%)]",
    alert:
      "bg-[hsla(30,66%,58%,0.10)] border border-[hsla(300,19%,6%,0.40)] text-[hsl(37,46%,58%)]",

    userButtonBox:
      "h-fit w-fit border-2 border-primary text-[hsl(194,73%,25%)] hover:border-accent transition-colors rounded-full",

    footer: "hidden",
  },
  layout: {
    socialButtonsPlacement: "bottom",
    shimmer: true,
    logoPlacement: "inside",
  },
};

/* Usage:
<ClerkProvider appearance={isDark ? clerkDark : clerkLight}>…</ClerkProvider>
*/
