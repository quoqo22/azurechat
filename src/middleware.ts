import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const requireAuth: string[] = ["/chat", "/api","/reporting", "/unauthorized"];
const requireAdmin: string[] = ["/reporting"];


// export async function middleware(request: NextRequest) {

//     const res = NextResponse.next();
//     const pathname = request.nextUrl.pathname;

//     if (requireAuth.some((path) => pathname.startsWith(path))) {

//         const token = await getToken({
//             req: request
//         });

//         //check not logged in
//         if (!token) {
//             const url = new URL(`/`, request.url);
//             return NextResponse.redirect(url);
//         }

//         if (requireAdmin.some((path) => pathname.startsWith(path))) {
//             //check if not authorized
//             if (!token.isAdmin) {
//                 const url = new URL(`/unauthorized`, request.url);
//                 return NextResponse.rewrite(url);
//             }
//         }
//     }

//     return res;
// }

// // note that middleware is not applied to api/auth as this is required to logon (i.e. requires anon access)
// export const config = { matcher: ["/chat/:path*", "/reporting/:path*", "/api/chat:path*"] };


export async function middleware(request: NextRequest) {

    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next(); // Continue to the next middleware/request if running in development mode
    }

    const res = NextResponse.next();
    const pathname = request.nextUrl.pathname;

    if (requireAuth.some((path) => pathname.startsWith(path))) {

        const token = await getToken({
            req: request
        });

        // Check if user is not logged in
        if (!token) {
            const url = new URL(`/`, request.url);
            return NextResponse.redirect(url);
        }

        if (requireAdmin.some((path) => pathname.startsWith(path))) {
            // Check if the user is not an admin
            if (!token.isAdmin) {
                const url = new URL(`/unauthorized`, request.url);
                return NextResponse.rewrite(url);
            }
        }
    }

    return res;
}

export const config = { matcher: ["/chat/:path*", "/reporting/:path*", "/api/chat:path*"] };