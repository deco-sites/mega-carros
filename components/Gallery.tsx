import { useId } from "preact/hooks";
import { ComponentChildren } from "preact";
import { useSignal } from "@preact/signals";
import { Slider } from "mc/components/Slider.tsx";
import LimitedDiv from "mc/components/LimitedDiv.tsx";
import SliderController from "./SliderController.tsx";
import SliderControllerJS from "mc/islands/SliderJS.tsx";

export interface Props {
  title?: string;
  slides: ComponentChildren[];
  bullets: ComponentChildren[];
}

const Slide = (
  isActive: boolean,
  component: ComponentChildren,
) => {
  const activeClass = isActive ? "z-10" : "z-0";

  return (
    <div class={`w-full h-full absolute top-0 left-0 ${activeClass}`}>
      {component}
    </div>
  );
};

const Bullet = (
  setAsActive: (index: number) => void,
  component: ComponentChildren,
  index: number,
  classes: string,
) => {
  const baseClass = "flex w-[162px] h-[120px] rounded-2xl border-2";

  return (
    <div
      onClick={() => setAsActive(index)}
      class={`cursor-pointer overflow-hidden ${classes} ${baseClass}`}
    >
      {component}
    </div>
  );
};

export default function Gallery(props: Props) {
  const id = useId();
  const activeItem = useSignal(0);
  const setItemAsActive = (index: number) => (activeItem.value = index);

  const renderSlideProxy = (component: ComponentChildren, index: number) => {
    const isActive = index === activeItem.value;
    return Slide(isActive, component);
  };

  const renderBulletProxy = (
    component: ComponentChildren,
    index: number,
    all: ComponentChildren[],
  ) => {
    const isFirst = index === 0;
    const isLast = index === (all.length - 1);
    const isActive = index === activeItem.value;

    const first = isFirst ? "ml-6 lg:ml-12" : "";
    const last = isLast ? "mr-6 lg:mr-12" : "";
    const border = isActive ? "border-yellow-400" : "border-transparent";
    const opacity = isActive ? "opacity-100" : "opacity-50";
    const base = "flex w-[162px] h-[120px] rounded-2xl border-2";
    const classes = `${first} ${last} ${border} ${opacity} ${base}`;

    return Bullet(setItemAsActive, component, index, classes);
  };

  return (
    <LimitedDiv
      baseClass="px-6 py-12 lg:px-0"
      class="bg-black flex flex-col gap-6 lg:gap-12"
    >
      {props.title && props.title != "" && (
        <h2 class="text-3xl">
          {props.title}
        </h2>
      )}

      <div class="w-full h-[350px] rounded-2xl overflow-hidden relative">
        {props.slides.map(renderSlideProxy)}
      </div>

      <div class="relative w-full">
        <div class="w-[calc(100%+48px)] lg:w-[calc(100%+96px)] -mx-6 lg:-mx-12">
          <div id={id} class="w-full">
            <Slider
              snap="scroll-snap-center flex flex-1"
              class="scrollbar-none gap-6"
            >
              {props.bullets.map(renderBulletProxy)}
            </Slider>

            <div class="hidden lg:flex w-full items-center mt-4 px-12">
              <SliderController />
            </div>

            <SliderControllerJS rootId={id} />
          </div>
        </div>

        <span class="hidden lg:block w-12 h-full bg-gradient-to-r from-black absolute top-0 -left-12" />
        <span class="hidden lg:block w-12 h-full bg-gradient-to-l from-black absolute top-0 -right-12" />
      </div>
    </LimitedDiv>
  );
}
