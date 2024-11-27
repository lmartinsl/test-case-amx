export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { name: string };
  image: string;
  fileName: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}
