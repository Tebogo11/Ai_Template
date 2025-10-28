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
import type * as aiSystem from "../aiSystem.js";
import type * as const_ from "../const.js";
import type * as outfit from "../outfit.js";
import type * as storage from "../storage.js";
import type * as user_consts from "../user/consts.js";
import type * as user_getters from "../user/getters.js";
import type * as user_tokens from "../user/tokens.js";
import type * as user_user from "../user/user.js";
import type * as utils from "../utils.js";
import type * as wardrobe from "../wardrobe.js";
import type * as wardrobes from "../wardrobes.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  aiSystem: typeof aiSystem;
  const: typeof const_;
  outfit: typeof outfit;
  storage: typeof storage;
  "user/consts": typeof user_consts;
  "user/getters": typeof user_getters;
  "user/tokens": typeof user_tokens;
  "user/user": typeof user_user;
  utils: typeof utils;
  wardrobe: typeof wardrobe;
  wardrobes: typeof wardrobes;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
