import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";


const isPublicRoute = createRouteMatcher([
  "/",
  "/home",
  "/sign-in",
  "/sign-up",
]);

const isPublicApiRoute = createRouteMatcher([
  "/api/videos",
]);



export default clerkMiddleware(async (auth, req) => {

  const { userId } = await auth();
  const url = new URL(req.url);
  const pathname = url.pathname;

  const isApiRequest = pathname.startsWith("/api");


  // ✅ If authenticated
  if (userId) {
    if (pathname === "/sign-in" || pathname === "/sign-up") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
  }


  // ❌ If not authenticated
  const isAllowedPublicRoute = isPublicRoute(req) || isPublicApiRoute(req);

  // Prevent redirect loop
  if (!isAllowedPublicRoute && pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }


  
  return NextResponse.next();
});



export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};