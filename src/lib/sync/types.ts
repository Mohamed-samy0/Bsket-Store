export type NormalizedProduct = {
  source: string;
  externalId: string;
  name: string;
  category: string;
  brand: string | null;
  description: string;
  price: number;
  images: string[];
  stock: number;
  rating: number;
  numReviews: number;
};
