/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as const_ from "../const.js";
import type * as generator_action from "../generator/action.js";
import type * as generator_mutation from "../generator/mutation.js";
import type * as landingPageApi_contactUs from "../landingPageApi/contactUs.js";
import type * as landingPageApi_newsLetterSubscriber from "../landingPageApi/newsLetterSubscriber.js";
import type * as outfit_mutation from "../outfit/mutation.js";
import type * as outfit_preview_query from "../outfit/preview/query.js";
import type * as outfit_query from "../outfit/query.js";
import type * as outfit from "../outfit.js";
import type * as storage from "../storage.js";
import type * as user_consts from "../user/consts.js";
import type * as user_getters from "../user/getters.js";
import type * as user_termsandconditions_actions from "../user/termsandconditions/actions.js";
import type * as user_tokens from "../user/tokens.js";
import type * as user_user from "../user/user.js";
import type * as utils from "../utils.js";
import type * as wardrobe_mutation from "../wardrobe/mutation.js";
import type * as wardrobe_query from "../wardrobe/query.js";
import type * as wardrobe from "../wardrobe.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  const: typeof const_;
  "generator/action": typeof generator_action;
  "generator/mutation": typeof generator_mutation;
  "landingPageApi/contactUs": typeof landingPageApi_contactUs;
  "landingPageApi/newsLetterSubscriber": typeof landingPageApi_newsLetterSubscriber;
  "outfit/mutation": typeof outfit_mutation;
  "outfit/preview/query": typeof outfit_preview_query;
  "outfit/query": typeof outfit_query;
  outfit: typeof outfit;
  storage: typeof storage;
  "user/consts": typeof user_consts;
  "user/getters": typeof user_getters;
  "user/termsandconditions/actions": typeof user_termsandconditions_actions;
  "user/tokens": typeof user_tokens;
  "user/user": typeof user_user;
  utils: typeof utils;
  "wardrobe/mutation": typeof wardrobe_mutation;
  "wardrobe/query": typeof wardrobe_query;
  wardrobe: typeof wardrobe;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
