import { useMutation, useQuery } from "convex/react";
import React, { useCallback, useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { useUserStore } from "@/store/useUserStore";
import { useAuth } from "@clerk/clerk-react";

// Get User and Subscription Info
// If user has no account, create one with free 10 image cap
// if has account, check if subscription is active
// if user not active. show paywall
const useManageSubscription = () => {
  const { has } = useAuth();
  const setHasSubscription = useUserStore((state) => state.setHasSubscription);
  const hasActiveAccountChecker = useMutation(
    api.user.user.hasActiveAccountChecker,
  );

  const manageSubscription = useCallback(async () => {
    if (!has) return;
    // const isFreeUser = has({ plan: "free_user" });
    const isBasicUser = has({ plan: "outfit_ai_basic_plan" });
    const isProUser = has({ plan: "outfit_ai_pro_plan" });
    const plan = isProUser ? "pro" : isBasicUser ? "basic" : "free";
    const hasActiveAccount = await hasActiveAccountChecker({ plan });
    console.log("Has Active Account:", hasActiveAccount);
    if (!hasActiveAccount) {
      // Create a new user account
      // await signOut();
      setHasSubscription(false);
    } else {
      // Check subscription status
      setHasSubscription(true);
      setHasSubscription(hasActiveAccount);
    }
  }, [has, hasActiveAccountChecker, setHasSubscription]);

  useEffect(() => {
    manageSubscription();

    return () => {
      setHasSubscription(false);
    };
  }, [manageSubscription]);

  return {};
};

export default useManageSubscription;
