import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const { username, password } = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );

  const data = await response.json();

  if (data.error.code === 200) {
    const expires =
      data.data.expires_in === "10d" ? 60 * 60 * 24 * 10 : 60 * 60 * 24;
    cookies().set("accessToken", data.data.access_token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: expires,
    });

    return NextResponse.json({ accessToken: process.env.ACCESSTOKEN });
  } else {
    return NextResponse.json(
      { message: "Đăng nhập thất bại" },
      { accessToken: null },
      { status: 401 }
    );
  }
}
