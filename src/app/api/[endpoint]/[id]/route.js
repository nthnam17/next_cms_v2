import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function GET(req, { params }) {
  const accessToken = cookies().get("accessToken")?.value;

  const endpoint = params.endpoint;
  const id = params.id;

  if (!endpoint) {
    return NextResponse.json(
      { message: "Missing 'path' parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok && data.error.code === 200) {
      return NextResponse.json(
        { message: "Lấy dữ liệu thành công", data: data.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Có lỗi vui lòng thử lại sau" },
        { status: 500 }
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
