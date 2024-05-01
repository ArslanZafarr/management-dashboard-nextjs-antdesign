import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const user = cookieStore.get("user");

  if (!user) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (user) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If the cookie retrieval fails or is not yet available, allow the request to proceed
  return NextResponse.next();
}
