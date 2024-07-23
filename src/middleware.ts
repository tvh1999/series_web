import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/account(.*)",
  "/services(.*)",
  "/bookmark(.*)",
]);
// addYourSpecificRoutesInHereInTheFormOfAnArrayElement

// Make sure that the `/api/webhooks/(.*)` route is not protected here
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
