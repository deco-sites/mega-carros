import { Children } from "preact/compat";
import type { JSX } from "preact";

type SliderProps = JSX.IntrinsicElements["ul"] & {
  snap?: string;
};

export function Slider({
  children,
  snap = "scroll-snap-center",
  class: _class = "gap-6 scrollbar-none",
  ...props
}: SliderProps) {
  return (
    <ul
      data-slider
      class={`flex flex-row items-center overflow-x-auto overscroll-x-contain snap-x snap-mandatory ${_class}`}
      {...props}
    >
      {Children.map(children, (child, index) => (
        <li
          data-slider-item={index}
          class={snap}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}
