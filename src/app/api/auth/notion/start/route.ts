import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";

export async function GET() {
  const clientId = process.env.NOTION_OAUTH_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "Missing NOTION_OAUTH_CLIENT_ID" }, { status: 500 });
  }

  const hdrs = await headers();
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const host = hdrs.get("host") ?? "localhost:3000";
  const origin = `${proto}://${host}`;
  const redirectUri = `${origin}/api/auth/notion/callback`;

  const state = crypto.randomUUID();
  const authorize = new URL("https://api.notion.com/v1/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("response_type", "code");
  authorize.searchParams.set("owner", "user");
  authorize.searchParams.set("redirect_uri", redirectUri);
  authorize.searchParams.set("state", state);

  const res = NextResponse.redirect(authorize.toString());
  const cookieStore = await cookies();
  const secure = proto === "https";
  res.cookies.set("notion_oauth_state", state, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return res;
}
