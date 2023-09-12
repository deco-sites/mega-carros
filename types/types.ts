export interface StrapiMedia {
  attributes: {
    url: string;
    formats?: {
      large: { url: string };
      medium: { url: string };
      small: { url: string };
      thumbnail: { url: string };
    };
  };
}

export interface Brand {
  name: string;
  slug: string;
  logo: { data: StrapiMedia };
  form_media: { data: StrapiMedia };
  form_video: string;
  best_cars: { data: { attributes: Car }[] };
  highlighted_offer: { data: { attributes: Car } };
  description: string;
  form_config: {
    cta: string;
    title: string;
    description: string;
    mode: "video" | "image";
  };
}

export interface Car {
  model: string;
  version: string;
  priceFrom: number;
  price: number;
  images: { data: StrapiMedia[] };
  avatar: { data: StrapiMedia };
  slug: string;
  specifications: {
    items: Record<string, string>;
    details: Record<string, string>;
  };
  hero_media: { data: StrapiMedia };
  hero_video: string;
  form_media: { data: StrapiMedia };
  form_video: string;
  hero_config: {
    grayscale: boolean;
    use_overlay: boolean;
    labels_position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    mode: "video" | "image";
  };
  form_config: {
    cta: string;
    title: string;
    description: string;
    mode: "video" | "image";
  };
  brand: { data: { attributes: { name: string; slug: string } } };
  related_cars: { data: { attributes: Car }[] };
}

export interface Service {
  name: string;
  icon: { data: StrapiMedia };
  slug: string;
  description: string;
  cta: string;
  hero_media: { data: StrapiMedia };
  hero_video: string;
  hero_config: {
    grayscale: boolean;
    use_overlay: boolean;
    labels_position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    mode: "video" | "image";
  };
  form_media: { data: StrapiMedia };
  form_video: string;
  form_config: {
    cta: string;
    title: string;
    description: string;
    mode: "video" | "image";
  };
}

export interface BrandPage {
  brand: Brand;
  cars: Car[];
}

export interface CarPage {
  car: Car | null;
}

export interface ServicePage {
  service: Service | null;
}

export interface ContactHandler {
  api: string;
  token: string;
}
