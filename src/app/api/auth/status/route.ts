import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("notion_access_token")?.value;
  return NextResponse.json({ authed: !!token });
}
