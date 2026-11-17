/** ギフト包装（巾着）— 税込220円 */

export const GIFT_WRAP_AMOUNT = 220;

export const GIFT_WRAP_LABEL = "ギフト包装（巾着）";

export const GIFT_WRAP_PRICE_ID =
  process.env.STRIPE_GIFT_WRAP_PRICE_ID ?? "price_1UcbAEAfAhQXdd2kmcrrHH9o";

export function cartLineId(productId: string, giftWrap: boolean): string {
  return `${productId}:${giftWrap ? "gift" : "plain"}`;
}
