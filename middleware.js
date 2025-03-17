import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
    const session = request.cookies.get("session");

    // Paths that don't require authentication
    const publicPaths = ["/", "/login", "/signup"];

    if (!session && !publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session && publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
