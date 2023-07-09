import { Car } from "mc/types/Car.ts";
import HeroBannerSlider from "mc/containers/HeroBannerSlider.tsx";
import type { Props as HeroBannerProps } from "mc/containers/HeroBanner.tsx";

export interface Slide extends Omit<HeroBannerProps, "labels" | "helper"> {
  car: Car;
}

export interface Props {
  banners: Slide[];
}

export default function HeroBannerSliderSection(props: Props) {
  const { banners } = props;

  const formattedBanners = banners.map((banner) => {
    const { car, ...bannerProps } = banner;

    const labels = {
      title: car.brand,
      description: car.name,
      priceFrom: car.priceFrom.toString(),
      price: car.price.toString(),
    };

    return { ...bannerProps, labels };
  });

  return <HeroBannerSlider banners={formattedBanners} />;
}
