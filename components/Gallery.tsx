import { useId } from "preact/hooks";
import { ComponentChildren } from "preact";
import { useSignal } from "@preact/signals";
import { Slider } from "mc/components/Slider.tsx";
import LimitedDiv from "mc/components/LimitedDiv.tsx";

export interface Props {
  title: string;
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
  isActive: boolean,
  setAsActive: (index: number) => void,
  component: ComponentChildren,
  index: number,
) => {
  const borderClass = isActive ? "border-yellow-400" : "border-transparent";
  const baseClass = "flex w-[162px] h-[120px] bg-gray-800 rounded-2xl border-2";

  return (
    <div
      onClick={() => setAsActive(index)}
      class={`cursor-pointer overflow-hidden ${baseClass} ${borderClass}`}
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

  const renderBulletProxy = (component: ComponentChildren, index: number) => {
    const isActive = index === activeItem.value;
    return Bullet(isActive, setItemAsActive, component, index);
  };

  return (
    <LimitedDiv
      baseClass="px-6 py-12 lg:px-0"
      class="bg-black flex flex-col gap-6 lg:gap-12"
    >
      <h2 class="text-3xl">
        {props.title}
      </h2>

      <div class="w-full h-[350px] bg-gray-800 rounded-2xl overflow-hidden relative">
        {props.slides.map(renderSlideProxy)}
      </div>

      <div class="relative w-full">
        <div
          id={id}
          class="w-[calc(100%+48px)] lg:w-[calc(100%+96px)] -mx-6 lg:-mx-12"
        >
          <Slider
            snap="scroll-snap-center flex flex-1"
            class="first:pl-6 last:pr-6 lg:first:pl-12 lg:last:pr-12 scrollbar-none gap-6"
          >
            {props.bullets.map(renderBulletProxy)}
          </Slider>
        </div>

        <span class="hidden lg:block w-12 h-full bg-gradient-to-r from-black absolute top-0 -left-12" />
        <span class="hidden lg:block w-12 h-full bg-gradient-to-l from-black absolute top-0 -right-12" />
      </div>
    </LimitedDiv>
  );
}
