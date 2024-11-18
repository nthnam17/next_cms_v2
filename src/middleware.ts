import { NextResponse, NextRequest } from "next/server";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
      if (request.nextUrl.pathname === "/dang-nhap") {
        return NextResponse.next();
      }
      // Redirect the user to login page if not logged in
      return NextResponse.redirect(new URL("/dang-nhap", request.url));
    }
    // If the user is already on the login page, continue
    // if  there is accessToken and url include "/logout" remove accessToken
    if (request.nextUrl.pathname === "/dang-xuat") {
      Cookies.remove("accesssToken");
      request.cookies.delete("accessToken");

      const response = NextResponse.redirect(
        new URL("/dang-nhap", request.url)
      );
      response.cookies.set("accessToken", "", {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 0,
      });
      return response;
    }

    if (request.nextUrl.pathname === "/") {
      const response = NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
      return response;
    }
    return NextResponse.next();
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(new URL("/dang-nhap", request.url));
  }
}

export const config = {
  //   matcher: ["/:path*"],
  matcher: ["/", "/users", "/dang-nhap", "/dang-xuat"],
};
