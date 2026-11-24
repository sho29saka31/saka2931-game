# Saka Games

ブラウザですぐ遊べる無料のミニゲーム集(2048、神経衰弱、反応速度テスト)。

- 公開URL: https://game.saka2931.jp
- 構成: TypeScript / Next.js (App Router) / [vinext](https://github.com/cloudflare/vinext) / Tailwind CSS / Cloudflare Workers

## 開発

```bash
npm install
npm run dev     # 開発サーバー
npm run build   # 本番ビルド
npm run start   # ビルド結果をローカルでプレビュー
npm run deploy  # Cloudflare Workers へデプロイ
```

データはすべてブラウザ内で処理され、サーバーには送信されません。
