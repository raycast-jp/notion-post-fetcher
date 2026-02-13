# Notion Post Fetcher

[![CI](https://github.com/raycast-jp/notion-post-fetcher/actions/workflows/ci.yml/badge.svg)](https://github.com/raycast-jp/notion-post-fetcher/actions/workflows/ci.yml)
[![Lint](https://github.com/raycast-jp/notion-post-fetcher/actions/workflows/linter.yml/badge.svg)](https://github.com/raycast-jp/notion-post-fetcher/actions/workflows/linter.yml)
[![Check dist/](https://github.com/raycast-jp/notion-post-fetcher/actions/workflows/check-dist.yml/badge.svg)](https://github.com/raycast-jp/notion-post-fetcher/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/raycast-jp/notion-post-fetcher/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/raycast-jp/notion-post-fetcher/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

Notion データベースから指定日付の投稿内容を取得する GitHub Action です。

## Inputs

| Name           | Required | Description                   | Default      |
| -------------- | -------- | ----------------------------- | ------------ |
| `notion-token` | Yes      | Notion API トークン           |              |
| `notion-db-id` | Yes      | Notion データベース ID        |              |
| `targetDate`   | Yes      | 取得対象の日付 (`YYYY-MM-DD`) | `2024-09-03` |

## Outputs

| Name    | Description      |
| ------- | ---------------- |
| `tweet` | 取得した投稿内容 |

## Usage

```yaml
steps:
  - uses: actions/checkout@v5

  - uses: raycast-jp/notion-post-fetcher@main
    id: fetch
    with:
      notion-token: ${{ secrets.NOTION_TOKEN }}
      notion-db-id: ${{ secrets.NOTION_DB_ID }}
      targetDate: '2024-09-03'

  - run: echo "${{ steps.fetch.outputs.tweet }}"
```

## Notion データベースの要件

対象の Notion データベースには以下のプロパティが必要です:

| プロパティ名 | 型        | 説明            |
| ------------ | --------- | --------------- |
| `日付`       | Date      | 投稿の日付      |
| `投稿内容`   | Rich Text | 投稿テキスト    |
| `画像`       | Files     | 添付画像 (任意) |

## Development

```bash
# 依存関係のインストール
npm install

# ビルド
npm run bundle

# テスト
npm test

# フォーマットチェック
npm run format:check

# Lint
npm run lint
```

## License

[MIT](LICENSE)
