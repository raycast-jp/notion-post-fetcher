import { format } from "date-fns";

import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

/**
 * 対象日付のツイートを取得する
 * @param date 対象の日付
 * @returns ツイートの内容
 */
export async function fetchTweetOnSpecificDate(date: Date): Promise<string> {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  const pages = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID!,
    filter: {
      property: "日付",
      date: {
        "equals": format(date, "yyyy-MM-dd")
      }
    }
  });

  if(pages.results.length === 0) throw new Error(`No tweet on ${format(date, "yyyy-MM-dd")}`);

  if(pages.results.length > 1) throw new Error(`Not support more than 2 tweet on ${format(date, "yyyy-MM-dd")}`);

  const page = pages.results[0];
  // @ts-ignore anyなので一旦仕方なく凌ぐ
  console.log(`target date is ${page["properties"]["日付"]["date"]["start"]}`);
  // @ts-ignore anyなので一旦仕方なく凌ぐ
  return page["properties"]["投稿内容"]["rich_text"][0]["plain_text"];
}
