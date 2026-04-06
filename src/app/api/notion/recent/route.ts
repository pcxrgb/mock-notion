import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getNotionClient } from "../../../../lib/notion";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("notion_access_token")?.value;
  if (!token) return NextResponse.json([], { status: 401 });

  const notion = getNotionClient(token);
  try {
    const data: any = await notion.search({
      sort: { direction: "descending", timestamp: "last_edited_time" },
      page_size: 25,
    });
    const results = (data?.results ?? []) as any[];
    const recent = results
      .filter((r) => {
        const p: any = r;
        const isPage = p.object === "page";
        const notArchived = !p.archived;
        const parentType = p?.parent?.type;
        const isTopLevelOrNestedPage = parentType === "workspace" || parentType === "page_id";
        return isPage && notArchived && isTopLevelOrNestedPage;
      })
      .map((p) => {
        const props = p.properties ?? {};
        let title: string | undefined = undefined;
        for (const key of Object.keys(props ?? {})) {
          const prop = props[key];
          if (prop?.type === "title") {
            const txt = prop?.title?.[0]?.plain_text;
            if (txt) {
              title = txt;
              break;
            }
          }
        }
        if (!title) {
          title =
            props?.title?.title?.[0]?.plain_text ??
            props?.Name?.title?.[0]?.plain_text ??
            undefined;
        }
        if (!title) return null;
        return {
          id: p.id as string,
          title,
          lastEdited: p.last_edited_time as string,
        };
      })
      .filter(Boolean)
      .slice(0, 6) as any[];
    const recentWithOwners = await Promise.all(
      recent.map(async (r: any) => {
        try {
          const full: any = await notion.pages.retrieve({ page_id: r.id });
          const avatarUrl =
            full?.created_by?.avatar_url ??
            full?.last_edited_by?.avatar_url ??
            undefined;
          return { ...r, avatarUrl };
        } catch {
          return r;
        }
      })
    );
    return NextResponse.json(recentWithOwners);
  } catch {
    return NextResponse.json([]);
  }
}
