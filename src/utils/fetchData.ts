import Cookies from "js-cookie";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function fetchData<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const userToken = cookies().get("accessToken")?.value || "";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (!userToken) {
      throw new Error("Error: Not access token");
    }

    headers["Authorization"] = `Bearer ${userToken}`;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data: T = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function customFetch(url: string, options: RequestInit = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const headers = { ...defaultHeaders, ...options.headers };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    {
      ...options,
      next: { revalidate: 60 },
      headers,
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Fetch error: ${error}`);
  }

  return await response.json();
}
