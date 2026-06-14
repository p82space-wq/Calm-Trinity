export type ProductMetadata = {
  ingredients?: string;
  volume?: string;
  usage?: string;
  care?: string;
  hoverImage?: string;
  subImages?: string[];
  featured?: boolean;
  sortOrder?: number;
};

export type CalmProduct = {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  priceId: string;
  unitAmount: number;
  currency: string;
  metadata: ProductMetadata;
};
