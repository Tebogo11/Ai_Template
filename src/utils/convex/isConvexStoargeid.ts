export function isConvexStorageId(value: string): boolean {
  // Convex storage IDs are typically short alphanumeric strings like "a1b2c3d4"
  // You can also match more specifically based on your schema.
  return /^[a-z0-9]{10,}$/i.test(value) && !value.startsWith("http");
}
