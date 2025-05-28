import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/interfaces/ApiResponse";
import { axios } from "@/lib/axios";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const usuario = formData.get("usuario")?.toString();
  const senha = formData.get("senha")?.toString();

  const {
    NEXT_PUBLIC_DEFAULT_LOGIN_REDIRECT,
    NEXT_PUBLIC_DEFAULT_LOGOUT_REDIRECT,
  } = process.env;

  if (!usuario || !senha) {
    return NextResponse.redirect(
      new URL(
        `${NEXT_PUBLIC_DEFAULT_LOGOUT_REDIRECT}?error=invalid_credentials`,
        req.url,
      ),
    );
  }

  try {
    const res = await axios.post<ApiResponse<string>>("/auth/login", { usuario, senha });

    if (res.status === 200 && res.data.success) {
      const response = NextResponse.redirect(
        new URL(NEXT_PUBLIC_DEFAULT_LOGIN_REDIRECT, req.url),
      );

      response.cookies.set("session_token", res.data.data, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.redirect(
      new URL(
        `${NEXT_PUBLIC_DEFAULT_LOGOUT_REDIRECT}?error=invalid_credentials`,
        req.url,
      ),
    );
  } catch {
    return NextResponse.redirect(
      new URL(
        `${NEXT_PUBLIC_DEFAULT_LOGOUT_REDIRECT}?error=unexpected_error`,
        req.url,
      ),
    );
  }
}
