export type CheckoutLineItem = {
  name: string;
  quantity: number;
  unitAmount: number;
  image: string | null;
};

export type CheckoutSessionSummary = {
  id: string;
  paymentStatus: string;
  customerEmail: string | null;
  amountTotal: number;
  currency: string;
  lineItems: CheckoutLineItem[];
};
