export function formatPrice(amount: number, currency = "jpy"): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(amount);
}
