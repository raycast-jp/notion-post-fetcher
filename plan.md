# Dependabot PR 消化計画

全11件のPRをリスク順に3フェーズに分けて進める。

## Phase 1: GitHub Actions (低リスク - CI/CDのみ影響)

ワークフローのアクションバージョンアップ。コード変更不要で、コンフリクトの可能性も低い。

| 順番 | PR | 内容 | 変更幅 |
|---|---|---|---|
| 1 | #47 | `actions/checkout` v4 → v5 | major |
| 2 | #57 | `actions/setup-node` v4 → v6 | major |
| 3 | #59 | `actions/upload-artifact` v4 → v5 | major |
| 4 | #55 | `github/codeql-action` v3 → v4 | major |
| 5 | #42 | `super-linter/super-linter` v7 → v8 | major |

4つのワークフローファイルで `actions/checkout@v4` と `actions/setup-node@v4` は共通で使われているため、#47 と #57 をマージ後に残りのPRはrebaseが必要になる可能性がある。

## Phase 2: npm 低リスク更新 (patch/minor)

| 順番 | PR | 内容 | 変更幅 |
|---|---|---|---|
| 6 | #60 | `form-data` 4.0.0 → 4.0.5 | patch |
| 7 | #56 | `npm` 11.3.0 → 11.6.2 | minor |

## Phase 3: npm メジャーバージョン更新 (要注意)

| 順番 | PR | 内容 | 変更幅 | リスク |
|---|---|---|---|---|
| 8 | #28 | `globals` 15.15.0 → 16.1.0 | major | 中 - ESLint設定への影響確認 |
| 9 | #61 | devDeps一括(9パッケージ) | mixed | 中 - TypeScript 5.5→5.9, prettier, eslint plugin等 |
| 10 | #54 | `dotenv` 16.4.5 → 17.2.3 | major | 中 - API変更の確認必要 |
| 11 | #58 | `@notionhq/client` 2.2.15 → 5.3.0 | major | 高 - プロジェクトのコア依存。APIの破壊的変更の可能性大 |

## 各PRの作業フロー

1. PRブランチをチェックアウト or rebase
2. ローカルで `npm install` & `npm run bundle`
3. テスト実行 (`npm test`)
4. 問題があればコード修正
5. CIパス確認後マージ

## 注意点

- 全PRが `mergeStatus=UNSTABLE` のため、古いPRはrebaseが必要な可能性が高い
- #58 (`@notionhq/client` v2→v5) は最もリスクが高く、Notion SDK のAPI変更への対応が必要になる可能性がある
- Phase 1 のマージ後、他PRとのコンフリクトが起きたらDependabotに `@dependabot rebase` コメントで再生成させる
