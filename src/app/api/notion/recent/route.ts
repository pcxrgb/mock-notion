import { NextResponse } from "next/server";

const NOTION_VERSION = "2022-06-28";
export const revalidate = 60;

export async function GET() {
  const token = process.env.NOTION_TOKEN;
  if (!token) return NextResponse.json([]);

  const res = await fetch("https://api.notion.com/v1/search", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sort: { direction: "descending", timestamp: "last_edited_time" },
    }),
    cache: "no-store",
  });
  if (!res.ok) return NextResponse.json([]);
  const data = await res.json();
  const results = (data?.results ?? []) as any[];
  const recent = results
    .filter((r) => r.object === "page")
    .map((p) => ({
      id: p.id as string,
      title:
        p.properties?.title?.title?.[0]?.plain_text ??
        p.properties?.Name?.title?.[0]?.plain_text ??
        "Untitled",
      lastEdited: p.last_edited_time as string,
    }));
  return NextResponse.json(recent);
}
