import { useId } from "preact/hooks";
import { Slider } from "mc/components/Slider.tsx";
import HeroBanner from "mc/containers/HeroBanner.tsx";
import SliderControllerJS from "mc/islands/SliderJS.tsx";
import SliderController from "mc/components/SliderController.tsx";
import type { Props as HeroBannerProps } from "mc/containers/HeroBanner.tsx";

export interface Props {
  banners: HeroBannerProps[];
}

function Slide(props: HeroBannerProps) {
  return (
    <div class="min-w-[100vw]">
      <HeroBanner {...props} helper={<SliderController />} />
    </div>
  );
}

export default function HeroBannerSlider(props: Props) {
  const randomFragment = Math.floor(Math.random() * 100);
  const id = randomFragment + useId();

  return (
    <div id={id}>
      <Slider>
        {props.banners.map(Slide)}
      </Slider>

      <SliderControllerJS rootId={id} interval={30 * 1e3} />
    </div>
  );
}
