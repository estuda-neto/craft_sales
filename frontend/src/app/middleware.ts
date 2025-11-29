import { NextRequest, NextResponse } from "next/server";
import { decoderTokenToClaims } from "./api/auth/decode-claims";

const adminRoutes = ["/admin", "/usuarios", "/dashboard/admin", "/config/admin"];
export const config = { matcher: ["/admin/:path*", "/usuarios/:path*", "/dashboard/admin/:path*", "/config/admin/:path*", "/analisar"] };

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log(`Middleware ativado para: ${path}`);

    const isAdminRoute = adminRoutes.some(route => path.startsWith(route));
    const token = request.cookies.get("jwt_back")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/manager?error=not_has_token", request.url));
    }

    const claims = decoderTokenToClaims(token);
    if (!claims) {
        return NextResponse.redirect(new URL("/manager?error=invalid_token", request.url));
    }

    const userRoles = Array.isArray(claims.roles) ? claims.roles : claims.roles ? [claims.roles] : [];
    const isAdmin = userRoles.some(role => role.includes("ADMIN"));

    if (isAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL("/manager?error=invalid_role", request.url));
    }
    return NextResponse.next();
}
