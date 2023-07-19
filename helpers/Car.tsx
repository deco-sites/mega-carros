import { Car } from "mc/types/types.ts";
import { Section } from "$live/blocks/section.ts";
import type { Props as HeroBannerProps } from "mc/containers/HeroBanner.tsx";

export function carToHeroBanner(
  car: Car,
  lcp: boolean,
  formSlot: Section,
): HeroBannerProps {
  const labels = {
    title: car.brand.data.attributes.name,
    description: `${car.model} ${car.version}`,
    priceFrom: car.priceFrom?.toString() ?? "",
    price: car.price.toString() ?? "",
  };

  const flags = {
    // deno-lint-ignore no-explicit-any
    labelsPosition: car.hero_config.labels_position as any,
  };

  const background = {
    configs: {
      lcp,
      mode: car.hero_config.mode,
      efx: {
        useOverlay: car.hero_config.use_overlay,
        applyGrayscale: car.hero_config.grayscale,
      },
    },
    data: {
      youtubeLink: car.hero_video,
      image: {
        mobile: car.hero_media.data.attributes.formats?.small.url ??
          car.hero_media.data.attributes.url,
        desktop: car.hero_media.data.attributes.url,
      },
    },
  };

  const action = `/${car.brand.data.attributes.slug}/${car.slug}`;
  return { action, labels, flags, background, formSlot };
}
