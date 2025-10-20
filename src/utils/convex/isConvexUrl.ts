export const isConvexUrl = (url?: string | null): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith(".convex.cloud");
  } catch {
    return false; // not a valid URL
  }
};
