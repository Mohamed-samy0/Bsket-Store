export function safeCallbackUrl(value?: string | null, fallback = "/") {
  if (!value) return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\"))
    return fallback;
  if (value.startsWith("/sign-in") || value.startsWith("/sign-up")) return fallback;
  return value;
}
