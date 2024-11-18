import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function GET(req, { params }) {
  const accessToken = cookies().get("accessToken")?.value;

  const { searchParams } = new URL(req.url);

  const endpoint = params.endpoint;

  const queryString = searchParams.toString();

  if (!endpoint) {
    return NextResponse.json(
      { message: "Missing 'path' parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok && data?.error?.code === 200) {
      return NextResponse.json(
        { message: "Lấy dữ liệu thành công", status: 200, data: data.data },
        { status: 200 }
      );
    } else {
      console.error("API response error:", data);
      return NextResponse.json(
        { message: data?.error?.message || "Có lỗi vui lòng thử lại sau" },
        { status: response.status || 500 }
      );
    }
  } catch (error) {
    console.error("API request error:", error);
    return NextResponse.json(
      { message: "Có lỗi vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
