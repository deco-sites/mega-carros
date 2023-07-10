export interface Brand {
  label: string;
  image: string;
  href: string;
}

export interface Car {
  name: string;
  brand: string;
  price: number;
  priceFrom: number;
}

export interface Service {
  name: string;
  icon: string;
}
