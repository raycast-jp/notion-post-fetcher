import { format } from 'date-fns'
import * as core from '@actions/core'
import { Client, isFullPage } from '@notionhq/client'
import { config } from 'dotenv'
config()

interface TweetData {
  content: string
  media?: string
}

/**
 * 対象日付のツイートを取得する
 * @param date 対象の日付
 * @returns ツイートの内容とメディア
 */
export async function fetchTweetOnSpecificDate(date: Date): Promise<TweetData> {
  const NOTION_TOKEN = core.getInput('notion-token')
  const NOTION_DB_ID = core.getInput('notion-db-id')

  const notion = new Client({
    auth: NOTION_TOKEN
  })
  const pages = await notion.databases.query({
    database_id: NOTION_DB_ID,
    filter: {
      property: '日付',
      date: {
        equals: format(date, 'yyyy-MM-dd')
      }
    }
  })

  if (pages.results.length === 0)
    throw new Error(`No tweet on ${format(date, 'yyyy-MM-dd')}`)

  if (pages.results.length > 1)
    throw new Error(
      `Not support more than 2 tweet on ${format(date, 'yyyy-MM-dd')}`
    )

  const page = pages.results[0]
  if (!isFullPage(page)) throw new Error('Unexpected partial page response')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = page.properties as Record<string, any>

  console.log(`target date is ${props['日付']['date']['start']}`)

  const tweetContent = props['投稿内容']['rich_text']
    .map((x: { text: { content: string } }) => x.text.content)
    .join('')

  const mediaFiles = props['画像']?.files || []
  const mediaUrls = mediaFiles
    .map((file: { file?: { url: string }; external?: { url: string } }) => {
      return file.file?.url || file.external?.url
    })
    .filter(Boolean)

  return {
    content: tweetContent,
    media: mediaUrls.length > 0 ? mediaUrls[0] : undefined
  }
}
