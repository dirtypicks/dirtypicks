import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Solo para server-side routing protection (opcional)
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const protectedPaths = ["/protected"];

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/protected/:path*"] };
