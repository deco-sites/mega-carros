import { Car } from "mc/types/Car.ts";
import HeroBanner from "mc/containers/HeroBanner.tsx";
import type { Props as HeroBannerProps } from "mc/containers/HeroBanner.tsx";

export interface Props extends Omit<HeroBannerProps, "labels" | "helper"> {
  car: Car;
}

export default function HeroBannerSection(props: Props) {
  const { car, ...bannerProps } = props;

  const labels = {
    title: car.brand,
    description: car.name,
    priceFrom: car.priceFrom.toString(),
    price: car.price.toString(),
  };

  return <HeroBanner {...bannerProps} labels={labels} />;
}
