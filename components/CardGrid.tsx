import { useId } from "preact/hooks";
import { ComponentChildren } from "preact";
import { Slider } from "mc/components/Slider.tsx";

export interface Props {
  cols?: number;
  class?: string;
  children: ComponentChildren[];
}

export default function CardGrid(props: Props) {
  const randomFragment = Math.floor(Math.random() * 100);
  const id = randomFragment + useId();
  const { children, cols = 3, class: _class = "" } = props;

  const desktopClass = `lg:grid lg:grid-cols-${cols}`;
  const marginClass = "gap-6 first:pl-6 last:pr-6";
  const resetClass = "lg:first:pl-0 lg:last:pr-0";

  return (
    <div id={id} class="w-full">
      <Slider
        snap="scroll-snap-center flex flex-1"
        class={`${desktopClass} ${marginClass} ${resetClass} ${_class}`}
      >
        {children}
      </Slider>
    </div>
  );
}
