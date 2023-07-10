export interface Brand {
  label: string;
  image: string;
  href: string;
}

export interface Car {
  name: string;
  brand: string;
  description: string;
  price: number;
  priceFrom: number;
  cover: string;
  pictures: string[];
  slug: string;
}

export interface Service {
  name: string;
  icon: string;
  slug: string;
}
