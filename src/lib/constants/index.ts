export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Basket";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Shop online with an assistant that helps you find the right product.";
export const CURRENCY = "EGP";

export const PROTECTED_ROUTES = [
  "/profile",
  "/orders",
  "/checkout",
  "/shipping-address",
  "/payment-method",
  "/place-order",
  "/admin",
];
