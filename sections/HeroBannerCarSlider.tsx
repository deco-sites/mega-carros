import { Car } from "mc/types/types.ts";
import { Section } from "$live/blocks/section.ts";
import { carToHeroBanner } from "mc/helpers/Car.tsx";
import HeroBannerSlider from "mc/containers/HeroBannerSlider.tsx";
import type { Props as HeroBannerProps } from "mc/containers/HeroBanner.tsx";

export interface Slide {
  car: Car | null;
  lcp: boolean;
}

export interface Props {
  banners: Slide[];
  formSlot: Section;
}

export default function HeroBannerSliderCarSection(props: Props) {
  const { banners, formSlot } = props;

  const formattedBanners = banners.map<HeroBannerProps | null>((banner) => {
    const { car, lcp } = banner;

    if (!car) return null;
    return carToHeroBanner(car, lcp, formSlot);
  });

  const test = (i: HeroBannerProps | null): i is HeroBannerProps => i !== null;
  const validBanners: HeroBannerProps[] = formattedBanners.filter(test);
  return <HeroBannerSlider banners={validBanners} />;
}
