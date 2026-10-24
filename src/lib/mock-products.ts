export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  numReviews: number;
  image?: string;
};

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "wireless-game-controller",
    name: "Wireless Game Controller",
    category: "Gaming",
    price: 1150,
    rating: 4.6,
    numReviews: 212,
  },
  {
    id: "2",
    slug: "gaming-headset-7-1",
    name: "Gaming Headset 7.1",
    category: "Gaming",
    price: 1290,
    rating: 4.4,
    numReviews: 148,
  },
  {
    id: "3",
    slug: "mechanical-keyboard-75",
    name: "Mechanical Keyboard 75%",
    category: "Gaming",
    price: 1450,
    rating: 4.7,
    numReviews: 96,
  },
  {
    id: "4",
    slug: "air-fryer-5l",
    name: "Air Fryer 5L",
    category: "Home",
    price: 2300,
    rating: 4.5,
    numReviews: 330,
  },
  {
    id: "5",
    slug: "noise-cancelling-earbuds",
    name: "Noise-Cancelling Earbuds",
    category: "Electronics",
    price: 1850,
    rating: 4.3,
    numReviews: 187,
  },
  {
    id: "6",
    slug: "linen-overshirt",
    name: "Linen Overshirt",
    category: "Fashion",
    price: 780,
    rating: 4.2,
    numReviews: 64,
  },
  {
    id: "7",
    slug: "ceramic-pour-over-set",
    name: "Ceramic Pour-Over Set",
    category: "Home",
    price: 640,
    rating: 4.8,
    numReviews: 41,
  },
  {
    id: "8",
    slug: "running-backpack-12l",
    name: "Running Backpack 12L",
    category: "Fashion",
    price: 920,
    rating: 4.1,
    numReviews: 53,
  },
];

export const mockCategories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Gaming", slug: "gaming" },
  { name: "Home", slug: "home" },
  { name: "Fashion", slug: "fashion" },
];
