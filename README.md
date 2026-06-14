# Calm Trinity

心理士と薬剤師が考えた、心と身体の両面から回復と整う時間を提供する高品質入浴剤ブランドの EC サイトです。

**本番 URL:** [https://calm-trinity.com](https://calm-trinity.com)

## 技術スタック

- [Next.js](https://nextjs.org) 16（App Router）
- React 19 / TypeScript
- Tailwind CSS 4
- [Stripe Checkout](https://stripe.com/docs/checkout)（決済）
- [Web3Forms](https://web3forms.com)（お問い合わせフォーム）
- Vercel（ホスティング）

## セットアップ

```bash
npm install
cp .env.local.example .env.local
# .env.local を編集（Stripe キー、Web3Forms アクセスキー等）
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## 環境変数

| 変数 | 説明 |
| --- | --- |
| `STRIPE_SECRET_KEY` | Stripe シークレットキー |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe 公開キー |
| `NEXT_PUBLIC_SITE_URL` | サイト URL（本番: `https://calm-trinity.com`） |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 表示用連絡先メール |
| `WEB3FORMS_ACCESS_KEY` | Web3Forms アクセスキー |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook シークレット |

## 主要コマンド

```bash
npm run dev          # 開発サーバー
npm run build        # 本番ビルド
npm run lint         # ESLint
npm run seed:stripe  # Stripe にテスト商品を登録（初回セットアップ用）
```

## 商品管理

商品は Stripe Dashboard から管理します（Pure Care / Mood Rest / Bloom Care 等）。
サイトは Stripe API 経由で商品情報を取得して表示します。

## デプロイ

Vercel にデプロイ済みです。環境変数は Vercel の Production / Preview 設定に登録してください。

```
NEXT_PUBLIC_SITE_URL=https://calm-trinity.com
```

## ドキュメント

仮置きコンテンツの確認・回答シート: [`docs/PLACEHOLDER_QA.md`](docs/PLACEHOLDER_QA.md)
