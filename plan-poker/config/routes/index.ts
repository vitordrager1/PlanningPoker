import type { ConfigRoutes } from "@/types/routes";

export const configRoutes: ConfigRoutes = {
  publicRoutes: [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/change-password",
    "/auth/reset-password",
    "/auth/verify-email",
    "/example/web-site-builder/campaign-hot-page",
    "/auth/users",
  ],
  authRoutes: ["/api/auth/signin"],
  apiRoutes: ["/api/protected-api"],
  protectedRoutes: ["/create-room"],
};
