import { Client } from "@notionhq/client";

export function getNotionClient(token: string): Client {
  return new Client({
    auth: token,
  });
}
