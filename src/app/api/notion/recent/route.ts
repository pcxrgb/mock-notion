import { NextResponse } from "next/server";
import { getNotionClient } from "../../../../lib/notion";

export const revalidate = 60;

export async function GET() {
  const token = process.env.NOTION_TOKEN;
  if (!token) return NextResponse.json([]);

  const notion = getNotionClient();
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
          avatarUrl: (p.last_edited_by as any)?.avatar_url ?? undefined,
        };
      })
      .filter(Boolean)
      .slice(0, 6) as any[];
    return NextResponse.json(recent);
  } catch {
    return NextResponse.json([]);
  }
}
