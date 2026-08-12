import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const AUTH_ROUTES = ["/login", "/registration"];

const PUBLIC_ROUTES = ["/", "/home", "/properties", ...AUTH_ROUTES];

export function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedToken = accessToken
    ? (jwt.decode(accessToken) as JwtPayload)
    : null;

  const userRole = decodedToken?.role;

  // Already logged-in user tries to access login/register
  if (accessToken && AUTH_ROUTES.includes(pathName)) {
    const redirectTo = request.nextUrl.searchParams.get("redirect");

    if (redirectTo && redirectTo.startsWith("/")) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/landlord/dashboard", request.url));
    }

    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Check public routes
  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathName === route || pathName.startsWith(route + "/"),
  );

  // Not logged in + trying to access protected route
  if (!accessToken && !isPublic) {
    const currentUrl = request.nextUrl.pathname + request.nextUrl.search;

    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", currentUrl);

    return NextResponse.redirect(loginUrl);
  }

  if (pathName.startsWith("/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathName.startsWith("/landlord") && userRole !== "LANDLORD") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathName.startsWith("/bookings") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/registration",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff|woff2|ttf)$).*)",
  ],
};
