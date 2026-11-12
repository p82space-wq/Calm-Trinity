/**
 * Stripe テスト商品シードスクリプト
 * 実行: npm run seed:stripe
 * 前提: .env.local に STRIPE_SECRET_KEY が設定されていること
 */
import Stripe from "stripe";

const products = [
  {
    name: "ラベンダー & カモミール",
    description:
      "ラベンダーとカモミールのやさしい香り。就寝前のリラックスタイムに。",
    price: 3800,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
    ],
    metadata: {
      ingredients: "天然海塩, ラベンダー精油, カモミール精油, ホホバオイル",
      usage: "１４０L〜１６０Lのお湯に対して１包を目安にご使用ください。",
      care: "京都の工房で一つひとつ手作業でブレンド。合成香料・着色料不使用。",
      hover_image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
      featured: "true",
      sort_order: "1",
    },
  },
  {
    name: "ユーカリ & ミント",
    description:
      "すっきりとしたハーバルな香り。疲れた体を芯から温めます。",
    price: 3800,
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    ],
    metadata: {
      ingredients: "天然海塩, ユーカリ精油, ペパーミント精油, セージ精油",
      usage: "１４０L〜１６０Lのお湯に対して１包を目安にご使用ください。",
      care: "オーガニック認証原料を使用。肌にやさしい弱酸性処方。",
      hover_image:
        "https://images.unsplash.com/photo-1515377900263-cffed993eb15?w=800&q=80",
      featured: "true",
      sort_order: "2",
    },
  },
  {
    name: "ローズ & ゼラニウム",
    description:
      "華やかで上品なフローラルの香り。特別な日のバスタイムに。",
    price: 4200,
    images: [
      "https://images.unsplash.com/photo-1515377900263-cffed993eb15?w=800&q=80",
    ],
    metadata: {
      ingredients: "天然海塩, ローズ精油, ゼラニウム精油, ダマスクバラ花水",
      usage: "１４０L〜１６０Lのお湯に対して１包を目安にご使用ください。",
      care: "ダマスクバラの花水を贅沢に配合したプレミアムライン。",
      featured: "false",
      sort_order: "3",
    },
  },
  {
    name: "ヒノキフォレスト",
    description:
      "京都のヒノキをイメージした森林浴の香り。深い呼吸とともに。",
    price: 4000,
    images: [
      "https://images.unsplash.com/photo-1447750365268-7bc7f9ee1f53?w=800&q=80",
    ],
    metadata: {
      ingredients: "天然海塩, ヒノキ精油, スギ精油, 檜葉エキス",
      usage: "１４０L〜１６０Lのお湯に対して１包を目安にご使用ください。",
      care: "京都産ヒノキの葉を低温抽出。森林浴のような清々しい香り。",
      hover_image:
        "https://images.unsplash.com/photo-1518882605630-740ebfc2a9eb?w=800&q=80",
      featured: "true",
      sort_order: "4",
    },
  },
];

async function main() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    console.error("Error: STRIPE_SECRET_KEY が設定されていません。");
    console.error("  .env.local を作成し、テストキーを設定してください。");
    process.exit(1);
  }

  const stripe = new Stripe(secretKey);

  console.log("Calm Trinity — Stripe 商品シード開始\n");

  for (const product of products) {
    const existing = await stripe.products.search({
      query: `name:"${product.name}"`,
    });

    if (existing.data.length > 0) {
      const existingProduct = existing.data[0];
      const priceId =
        typeof existingProduct.default_price === "string"
          ? existingProduct.default_price
          : existingProduct.default_price?.id ?? "—";
      console.log(`⏭  スキップ（既存）: ${product.name}`);
      console.log(`   product_id: ${existingProduct.id}, price_id: ${priceId}\n`);
      continue;
    }

    const created = await stripe.products.create({
      name: product.name,
      description: product.description,
      images: product.images,
      metadata: product.metadata,
      default_price_data: {
        currency: "jpy",
        unit_amount: product.price,
      },
    });

    const priceId =
      typeof created.default_price === "string"
        ? created.default_price
        : created.default_price?.id ?? "—";

    console.log(`✅ 作成完了: ${created.name} (¥${product.price.toLocaleString()})`);
    console.log(`   product_id: ${created.id}, price_id: ${priceId}\n`);
  }

  console.log("シード完了。npm run dev で商品を確認してください。");
}

main().catch((error) => {
  console.error("シード中にエラーが発生しました:", error);
  process.exit(1);
});
