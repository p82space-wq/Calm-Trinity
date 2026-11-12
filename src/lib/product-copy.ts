/** 全商品共通の使用方法・使用・保管上の注意 */

export const DEFAULT_USAGE =
  "１４０L〜１６０Lのお湯に対して１包を目安にご使用ください。";

const PRECAUTIONS_BASE = [
  "肌に合わないときは使用をおやめください。",
  "入浴以外の用途で使用しないでください。",
] as const;

const PRECAUTIONS_TAIL = [
  "入浴後色や香りが残らないようすぐに浴槽を洗い流してください。",
  "風呂の材質等によっては使用ができないことがあります。",
  "商品の特性上色や香りの変化、湿気による凝固、砂等が混在することがありますが、使用上問題ありません。",
  "高温多湿や直射日光を避け子供の届かない所に保管ください。",
] as const;

/** Pure 以外（追い焚き不可） */
export const DEFAULT_PRECAUTIONS = [
  ...PRECAUTIONS_BASE,
  "追い焚きはしないでください。",
  ...PRECAUTIONS_TAIL,
].join("\n");

/** Pure のみ追い焚き可能 */
export const PURE_PRECAUTIONS = [
  ...PRECAUTIONS_BASE,
  "追い焚きが可能です。",
  ...PRECAUTIONS_TAIL,
].join("\n");

export function getPrecautionsForProduct(name: string): string {
  return /pure/i.test(name) ? PURE_PRECAUTIONS : DEFAULT_PRECAUTIONS;
}
