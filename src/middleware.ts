import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  // Matcher for routes that should be protected
  matcher: [
    // Match all routes except static files, api routes, and public routes
    "/((?!.*\\..*|_next|api|trpc).*)",
    // Match all API routes except webhook
    "/api/((?!webhook).*)",
  ],
};
