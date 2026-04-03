import { NextResponse } from "next/server";

const NOTION_VERSION = "2022-06-28";
export const revalidate = 60;

export async function GET() {
  const token = process.env.NOTION_TOKEN;
  const dbId = process.env.NOTION_EVENTS_DB_ID;
  if (!token || !dbId) return NextResponse.json([]);

  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sorts: [{ property: "Date", direction: "ascending" }],
      page_size: 25,
    }),
    cache: "no-store",
  });
  if (!res.ok) return NextResponse.json([]);
  const data = await res.json();
  const events = (data?.results ?? []).map((item: any) => {
    const props = item.properties ?? {};
    const name =
      props.Name?.title?.[0]?.plain_text ??
      props.Title?.title?.[0]?.plain_text ??
      "Event";
    const date = props.Date?.date ?? {};
    const startISO = (date.start as string) ?? new Date().toISOString();
    const endISO = (date.end as string) ?? startISO;
    const calendarIdRaw = (props.Calendar?.select?.name as string | undefined)?.toLowerCase() ?? "work";
    const calendarId: "work" | "personal" | "holidays" =
      calendarIdRaw === "personal" ? "personal" : calendarIdRaw === "holidays" ? "holidays" : "work";
    return { name, calendarId, startISO, endISO };
  });
  return NextResponse.json(events);
}
